import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'The document title',
    required: true,
  })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The document description',
    required: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The document url',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsUrl()
  publicUrl: string;

  @ApiProperty({
    description: 'The document size',
    required: true,
  })
  @IsDefined()
  @IsNumber()
  size: number;

  @ApiProperty({
    description: 'The document mimetype',
    required: true,
  })
  @IsDefined()
  @IsString()
  mimetype: string;

  @ApiProperty({
    description: 'The document name',
    required: true,
  })
  @IsDefined()
  @IsString()
  filename: string;

  @IsDefined()
  @IsString()
  originalname: string;

  @IsDefined()
  @IsString()
  encoding: string;
}
