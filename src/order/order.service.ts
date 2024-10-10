import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends Repository<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    repository: Repository<OrderEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
