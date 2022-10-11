import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prepa-sn/shared/enums';
import { IsDefined, IsEnum } from 'class-validator';
import { CartItemType } from '../entities/cart.entity';

export class FilterDto {
  @ApiProperty({
    description: 'The execices chapter',
    required: true,
    type: String,
  })
  @IsDefined()
  @IsEnum(CartItemType)
  type: CartItemType;

  @IsDefined()
  @IsEnum(Status)
  status: Status;
}
