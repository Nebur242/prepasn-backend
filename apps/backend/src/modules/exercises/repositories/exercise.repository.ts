import { EntityRepository, Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';

@EntityRepository(Exercise)
export class ExercisesRepository extends Repository<Exercise> {}
