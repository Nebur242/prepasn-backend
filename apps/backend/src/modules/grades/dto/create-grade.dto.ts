import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Document } from '../../documents/entities/document.entity';
import { Grade } from '../entities/grade.entity';

export class CreateGradeDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The document id',
    required: true,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  image?: Document['id'];

  @ApiProperty({
    description: 'The document id',
    required: true,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  video?: Document['id'];

  @ApiProperty({
    description: 'The parent section id',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  parent?: Grade['id'];

  @ApiProperty({
    description: 'The children of the grade',
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBaseContentDto)
  children?: CreateBaseContentDto[];
}
