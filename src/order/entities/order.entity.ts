import { ApiProperty } from '@nestjs/swagger';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => OrderItemEntity, (data) => data.order)
  @ApiProperty({ type: OrderItemEntity, isArray: true })
  items: OrderItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
