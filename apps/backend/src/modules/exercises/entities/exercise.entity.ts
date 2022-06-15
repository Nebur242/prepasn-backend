import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity()
export class Exercise extends BaseContent {
  @ManyToOne(() => Chapter, (chapter) => chapter.exercises)
  chapter?: Chapter;

  @OneToMany(() => Question, (question) => question.exercise)
  questions?: Question[];
}
