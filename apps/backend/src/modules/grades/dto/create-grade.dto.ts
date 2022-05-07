import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Grade } from '../entities/grade.entity';

export class CreateGradeDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The parent section id',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  parent?: Grade['id'];
}
