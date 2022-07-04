import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class FilterDto {
  @ApiProperty({
    description: 'The execices chapter',
    required: true,
    type: String,
  })
  @IsDefined()
  chapter: string;
}
