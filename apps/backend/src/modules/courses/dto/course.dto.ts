import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '../../../common/dtos/create-base-content.dto';
import { ArrayNotEmpty, IsArray, IsDefined } from 'class-validator';
import { GradeDto } from '../../grades/dto/grade.dto';

export class CourseDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The array of grades',
    required: true,
    type: [GradeDto],
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  grades!: GradeDto[];
}
