import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Exercise } from '../../exercises/entities/exercise.entity';

export class CreateQuestionDto extends CreateBaseContentDto {
  @IsDefined()
  @IsNumber()
  exercise: Exercise['id'];

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isCorrect?: boolean;
}
