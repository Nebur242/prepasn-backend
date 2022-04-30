import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '../../../common/dtos/create-base-content.dto';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GradeDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The grade parent',
    required: true,
    type: GradeDto,
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  parent?: GradeDto;

  @ApiProperty({
    description: 'The children of the grade',
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GradeDto)
  children?: GradeDto[];
}
