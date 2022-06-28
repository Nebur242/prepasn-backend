import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class FilterDto {
  @ApiProperty({
    description: 'The course infos',
    required: true,
    type: String,
  })
  @IsDefined()
  course: string;
}
