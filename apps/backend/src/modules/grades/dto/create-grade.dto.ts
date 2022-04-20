import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CreateBaseContentDto } from 'apps/backend/src/common/dtos/create-base-content.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateGradeDto extends CreateBaseContentDto {
  @ApiProperty({
    description: 'The parent section id',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  parent: number;
}
