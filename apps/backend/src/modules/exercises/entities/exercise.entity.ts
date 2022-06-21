import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Question } from '../../questions/entities/question.entity';
import { displayType, exerciseType, level } from '@prepa-sn/shared/enums';

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
