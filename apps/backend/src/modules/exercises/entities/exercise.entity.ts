import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Question } from '../../questions/entities/question.entity';

export enum exerciseType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  FILL_IN_THE_BLANK = 'fill_in_the_blank',
  MATCHING = 'matching',
  ORDERING = 'ordering',
  GROUPING = 'grouping',
}

export enum level {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum displayType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
}
@Entity()
export class Exercise extends BaseContent {
  @ManyToOne(() => Chapter, (chapter) => chapter.exercises)
  chapter?: Chapter;

  @OneToMany(() => Question, (question) => question.exercise)
  questions?: Question[];

  @Column({
    type: 'enum',
    enum: exerciseType,
    default: exerciseType.MULTIPLE_CHOICE,
  })
  type: exerciseType;

  @Column({
    type: 'enum',
    enum: level,
    default: level.EASY,
  })
  level: level;

  @Column({
    type: 'enum',
    enum: displayType,
    default: displayType.TEXT,
  })
  display: displayType;
}
