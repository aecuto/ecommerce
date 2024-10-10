import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  @IsString()
  price: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
