import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '../../../common/dtos/create-base-content.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Grade } from '../entities/grade.entity';

export class CreateGradeDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The parent section id',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  parent?: Grade['id'];
}
