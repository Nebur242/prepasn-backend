import { documentType } from '@prepa-sn/shared/enums';
import { IsDefined, IsEnum, IsString, IsUrl } from 'class-validator';

export class CreateDocumentDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsEnum(documentType)
  type: documentType;

  @IsDefined()
  @IsString()
  @IsUrl()
  url: string;
}
