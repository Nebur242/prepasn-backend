import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from '@prepa-sn/shared/enums';
import { IsDefined, IsEnum, IsString, IsUrl } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'The document title',
    required: true,
  })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The document type',
    required: true,
  })
  @IsDefined()
  @IsEnum(DocumentType)
  type: DocumentType;

  @ApiProperty({
    description: 'The document url',
    required: true,
  })
  @IsDefined()
  @IsString()
  @IsUrl()
  url: string;
}
