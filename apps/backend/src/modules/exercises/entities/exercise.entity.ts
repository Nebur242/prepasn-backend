import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { ManyToOne, OneToMany } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Question } from '../../questions/entities/question.entity';
import { Response } from '../../responses/entities/response.entity';

export class Exercise extends BaseContent {
  @ManyToOne(() => Chapter, (chapter) => chapter.exercises)
  chapter: Chapter;

  @OneToMany(() => Question, (question) => question.exercise)
  questions?: Question[];

  @OneToMany(() => Response, (exercise) => exercise.exercise)
  responses?: Response[];
}
