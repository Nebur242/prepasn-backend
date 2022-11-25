import { Entity, ManyToOne } from 'typeorm';
import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Chapter } from '../../chapters/entities/chapter.entity';

@Entity()
export class Section extends BaseContent {
  @ManyToOne(() => Chapter, (chapter) => chapter.exercises, {
    onDelete: 'CASCADE',
  })
  chapter: Chapter;
}
