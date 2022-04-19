import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateBaseContentDto {
  @ApiProperty({
    description: 'The title of the content',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'The content description',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: 'The featued image link',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  featuredImage?: string;

  @ApiProperty({
    description: 'The content video link',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  videoUrl?: string;
}
