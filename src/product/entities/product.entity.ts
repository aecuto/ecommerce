import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ApiProperty()
  @Column()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @Column({ default: 0 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
