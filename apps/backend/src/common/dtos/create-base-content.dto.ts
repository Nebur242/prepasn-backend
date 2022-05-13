import { ApiProperty } from '@nestjs/swagger';
import { Document } from '@prepa-sn/backend/modules/documents/entities/document.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
    description: 'The image document id',
    required: true,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  image?: Document['id'];

  @ApiProperty({
    description: 'The video document id',
    required: true,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  video?: Document['id'];
}
