import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { ManyToOne } from 'typeorm';
import { Exercise } from '../../exercises/entities/exercise.entity';

export class Response extends BaseContent {
  @ManyToOne(() => Exercise, (exercise) => exercise.responses)
  exercise: Exercise;
}
