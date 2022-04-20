import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '../../../common/dtos/create-base-content.dto';
import { IsDefined } from 'class-validator';
import { CourseDto } from '../../courses/dto/course.dto';

export class ChapterDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The course infos',
    required: true,
    type: CourseDto,
  })
  @IsDefined()
  course!: CourseDto;
}
