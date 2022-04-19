import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateChapterDto } from './create-chapter.dto';

export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  @Exclude()
  course?: number;
}
