import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity()
export class Question extends BaseContent {
  @ManyToOne(() => Exercise, (exercise) => exercise.questions, {
    onDelete: 'CASCADE',
  })
  exercise: Exercise;

  @Column({
    type: Boolean,
  })
  @Exclude({ toPlainOnly: true })
  isCorrect: boolean;
}
