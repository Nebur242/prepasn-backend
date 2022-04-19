import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBaseContentDto {
  @ApiProperty({
    description: 'The title of the content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content description',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: 'The featured image link',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  featuredImage?: string;

  @ApiProperty({
    description: 'The content video link',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  videoUrl?: string;
}
