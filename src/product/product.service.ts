import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends Repository<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    repository: Repository<ProductEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
