import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/accessToken.guard';
import { ProductEntity } from 'src/product/entities/product.entity';
import { User } from 'src/auth/decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('product')
@ApiTags('product')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() payload: ProductEntity, @User() user: UserEntity) {
    return this.productService.save({ ...payload, user });
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.productService.find({ where: { user: { id: user.id } } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOneBy({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: ProductEntity) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.softDelete(id);
  }
}
