import { IsDefined, IsNumber } from 'class-validator';
import { Course } from '../../courses/entities/course.entity';

export class CreateOrderItemDto {
  @IsDefined()
  @IsNumber()
  quantity: number;

  @IsDefined()
  @IsNumber()
  price: number;

  @IsDefined()
  course: Course['id'];
}
