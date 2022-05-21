import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import { ArrayNotEmpty, IsDefined, IsOptional } from 'class-validator';
import { Grade } from '@prepa-sn/backend/modules/grades/entities/grade.entity';
import { Document } from '../../documents/entities/document.entity';
import { Type } from 'class-transformer';

export class CreateCourseDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The array of grades id',
    required: true,
    type: [Number],
  })
  @IsDefined()
  @ArrayNotEmpty()
  @Type(() => Grade)
  grades: Grade['id'][];

  @ApiProperty({
    description: 'The array of grades id',
    required: true,
    type: [Document],
  })
  @IsOptional()
  @ArrayNotEmpty()
  @Type(() => Document)
  documents?: Document[];
}
