import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import { IsNumber } from 'class-validator';
import { Course } from '@prepa-sn/backend/modules/courses/entities/course.entity';

export class CreateChapterDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The id of the course',
    required: true,
    type: Number,
  })
  @IsNumber()
  course: Course['id'];
}
