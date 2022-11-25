import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { User } from '../../users/entities/user.entity';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsDefined()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsDefined()
  @IsNumber()
  total: number;

  @IsDefined()
  @IsNumber()
  subTotal: number;

  @IsOptional()
  @IsNotEmpty()
  notes?: string;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  items: OrderItem['id'][];

  @IsDefined()
  orderedBy: User;
}
