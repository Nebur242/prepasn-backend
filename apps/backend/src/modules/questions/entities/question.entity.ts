import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { ManyToOne } from 'typeorm';
import { Exercise } from '../../exercises/entities/exercise.entity';

export class Question extends BaseContent {
  @ManyToOne(() => Exercise, (exercise) => exercise.questions)
  exercise: Exercise;
}
