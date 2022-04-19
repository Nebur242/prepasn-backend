import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '../../../common/dtos/create-base-content.dto';
import { ArrayNotEmpty, IsNumber } from 'class-validator';
import { Grade } from '../../grades/entities/grade.entity';

export class CreateCourseDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The array of grades id',
    required: true,
    type: [Number],
  })
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  grades: Grade['id'][];
}
