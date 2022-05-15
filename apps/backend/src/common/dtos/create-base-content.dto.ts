import { ApiProperty } from '@nestjs/swagger';
import { Document } from '@prepa-sn/backend/modules/documents/entities/document.entity';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
    type: Document,
  })
  @IsOptional()
  @Type(() => Document)
  image?: Document;

  @ApiProperty({
    description: 'The video document id',
    required: true,
    type: Document,
  })
  @IsOptional()
  @Type(() => Document)
  video?: Document;
}
