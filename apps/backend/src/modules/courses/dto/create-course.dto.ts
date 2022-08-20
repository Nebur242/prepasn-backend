import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import { ArrayNotEmpty, IsDefined, IsEnum, IsOptional } from 'class-validator';
import { Grade } from '@prepa-sn/backend/modules/grades/entities/grade.entity';
import { Document } from '../../documents/entities/document.entity';
import { Type } from 'class-transformer';
import { Category } from '../../categories/entities/category.entity';
import { level } from '@prepa-sn/shared/enums';

export class CreateCourseDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The array of grades id',
    required: true,
    type: [Number],
  })
  @IsDefined()
  @ArrayNotEmpty()
  @Type(() => Category)
  categories: Category['id'][];

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
  @Type(() => Document)
  documents?: Document[];

  @ApiProperty({
    description: 'The array of grades id',
  })
  @IsDefined()
  isFree: boolean;

  @IsOptional()
  overview?: string;

  @ApiProperty({
    description: 'The array of grades id',
  })
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'The estimated course duration',
  })
  @IsOptional()
  duration?: number;

  @ApiProperty({
    description: 'The estimated course duration period',
  })
  @IsOptional()
  durationPeriod?: string;

  @ApiProperty({
    description: 'The estimated course duration',
  })
  @IsDefined()
  @IsEnum(level)
  level: level;
}
