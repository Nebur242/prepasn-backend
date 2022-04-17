import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseContentDto } from 'apps/backend/src/common/dtos/create-base-content.dto';
import { ArrayNotEmpty, IsArray, IsDefined } from 'class-validator';

export class CreateCourseDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The array of grades',
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  grades: number[];
}
