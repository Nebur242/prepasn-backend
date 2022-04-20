import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '../../../common/dtos/create-base-content.dto';
import { ArrayNotEmpty, IsArray, IsDefined } from 'class-validator';

export class GradeDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The grade parent',
    required: true,
    type: GradeDto,
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  parent!: GradeDto;
}
