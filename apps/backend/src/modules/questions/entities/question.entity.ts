import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity()
export class Question extends BaseContent {
  @ManyToOne(() => Exercise, (exercise) => exercise.questions)
  exercise: Exercise;

  @Column()
  isCorrect: boolean;
}
