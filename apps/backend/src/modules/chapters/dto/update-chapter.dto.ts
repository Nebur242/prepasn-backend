import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateChapterDto } from './create-chapter.dto';

export class UpdateChapterDto extends OmitType(PartialType(CreateChapterDto), [
  'course',
]) {}
