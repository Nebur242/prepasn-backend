import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '../../../common/dtos/create-base-content.dto';
import { ArrayNotEmpty, IsArray, IsDefined, IsNumber } from 'class-validator';

export class CreateCourseDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The array of grades id',
    required: true,
    type: [Number],
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  grades!: number[];
}
