import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/accessToken.guard';
import { OrderEntity } from 'src/order/entities/order.entity';
import { User } from 'src/auth/decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductService } from 'src/product/product.service';
import { In } from 'typeorm';
import { OrderItemService } from 'src/order/order-item.service';

@Controller('order')
@ApiTags('order')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private productService: ProductService,
  ) {}

  @Post()
  async create(@Body() payload: OrderEntity, @User() user: UserEntity) {
    const productIds = payload.items.map((item) => {
      return item.product_id;
    });

    const products = await this.productService.find({
      where: { id: In(productIds) },
    });

    if (productIds.length !== products.length) {
      throw new BadRequestException('Wrong product ids');
    }

    const order = await this.orderService.save({ ...payload, user });

    const items = payload.items.map((item) => {
      const product = products.find(
        (product) => product.id === item.product_id,
      );
      return { ...item, order, name: product.name };
    });

    await this.orderItemService.insert(items);

    return { msg: 'place order successfully!' };
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.orderService.find({
      where: { user: { id: user.id } },
      relations: { items: true },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserEntity) {
    return this.orderService.findOne({
      where: { user: { id: user.id }, id },
      relations: { items: true },
    });
  }
}
