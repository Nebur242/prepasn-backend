import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionDto } from './create-section.dto';

export class UpdateExerciseDto extends PartialType(CreateSectionDto) {}
