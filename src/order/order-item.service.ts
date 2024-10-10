import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService extends Repository<OrderItemEntity> {
  constructor(
    @InjectRepository(OrderItemEntity)
    repository: Repository<OrderItemEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
