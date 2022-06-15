import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import { IsDefined, IsNumber } from 'class-validator';
import { Exercise } from '../../exercises/entities/exercise.entity';

export class CreateQuestionDto extends CreateBaseContentDto {
  @IsDefined()
  @IsNumber()
  exercise: Exercise['id'];
}
