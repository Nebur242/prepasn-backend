import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class PaymentIntentsDto {
  @ApiProperty({
    description: 'The total price to pay',
    required: true,
  })
  @IsDefined()
  amount: number;

  @ApiProperty({
    description: 'The currency used',
    required: true,
  })
  @IsDefined()
  currency: string;
}
