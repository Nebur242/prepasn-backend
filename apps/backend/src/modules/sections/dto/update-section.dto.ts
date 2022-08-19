import { PartialType } from '@nestjs/swagger';
import { CreateSectionDto } from './create-section.dto';

export class UpdateExerciseDto extends PartialType(CreateSectionDto) {}
