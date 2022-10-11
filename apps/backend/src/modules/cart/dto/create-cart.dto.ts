import { IsDefined, IsEnum, IsNumber } from 'class-validator';
import { Course } from '../../courses/entities/course.entity';
import { CartItemType } from '../entities/cart.entity';

export class CreateCartDto {
  @IsDefined()
  @IsEnum(CartItemType)
  type: CartItemType;

  @IsDefined()
  @IsNumber()
  item: Course['id'];

  @IsDefined()
  @IsNumber()
  quantity: number;
}
