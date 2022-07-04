import { CreateBaseContentDto } from '@prepa-sn/backend/common/dtos/create-base-content.dto';
import { IsDefined, IsEnum, IsNumber } from 'class-validator';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { displayType, exerciseType, level } from '@prepa-sn/shared/enums';
export class CreateExerciseDto extends CreateBaseContentDto {
  @IsDefined()
  @IsNumber()
  chapter: Chapter['id'];

  @IsDefined()
  @IsEnum(exerciseType)
  type: exerciseType;

  @IsDefined()
  @IsEnum(level)
  level: level;

  @IsDefined()
  @IsEnum(displayType)
  display: displayType;
}
