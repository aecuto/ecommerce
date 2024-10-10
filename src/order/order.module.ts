import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItemService } from 'src/order/order-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService],
})
export class OrderModule {}
