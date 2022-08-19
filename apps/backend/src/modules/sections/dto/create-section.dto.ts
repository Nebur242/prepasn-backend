import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import { IsDefined, IsNumber } from 'class-validator';
import { Chapter } from '../../chapters/entities/chapter.entity';
export class CreateSectionDto extends CreateBaseContentDto {
  @IsDefined()
  @IsNumber()
  chapter: Chapter['id'];

}
