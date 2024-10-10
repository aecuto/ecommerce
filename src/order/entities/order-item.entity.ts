import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { OrderEntity } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order_item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @Column()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @Column()
  @IsNumber()
  @ApiProperty()
  price: number;

  @Column()
  @IsString()
  @ApiProperty()
  name: string;

  @ManyToOne(() => OrderEntity, (data) => data.id)
  order: OrderEntity;
}
