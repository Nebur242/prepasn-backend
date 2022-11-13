import { Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from '../../order-item/dto/create-order-item.dto';

export class CheckoutForm {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  notes?: string;
}

export class CreateCheckoutDto {
  @Type(() => CheckoutForm)
  @ValidateNested()
  form: CheckoutForm;

  @IsDefined()
  @IsNumber()
  total: number;

  @Type(() => CreateOrderItemDto)
  @ValidateNested({ each: true })
  items: CreateOrderItemDto[];
}
