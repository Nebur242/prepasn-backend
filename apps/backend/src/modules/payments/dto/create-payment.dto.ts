import { IsDefined, IsNumber, IsOptional } from 'class-validator';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';

export class CreatePaymentDto {
  @IsDefined()
  @IsNumber()
  total: number;

  @IsOptional()
  details?: string;

  @IsDefined()
  order: Order['id'];

  @IsDefined()
  paidBy: User;
}
