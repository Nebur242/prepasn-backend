import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import { ArrayNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Course } from '@prepa-sn/backend/modules/courses/entities/course.entity';
import { Document } from '../../documents/entities/document.entity';
import { Type } from 'class-transformer';

export class CreateChapterDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The id of the course',
    required: true,
    type: Number,
  })
  @IsNumber()
  course: Course['id'];

  @ApiProperty({
    description: 'The array of documents id',
    required: true,
    type: [Number],
  })
  @IsOptional()
  @ArrayNotEmpty()
  @Type(() => Document)
  documents?: Document[];
}
