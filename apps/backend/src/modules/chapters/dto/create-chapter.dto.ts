import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from '../../../common/dtos/create-base-content.dto';
import { ArrayNotEmpty, IsArray, IsDefined, IsNumber } from 'class-validator';

export class CreateChapterDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The id of the course',
    required: true,
    type: Number,
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber()
  course!: number;
}
