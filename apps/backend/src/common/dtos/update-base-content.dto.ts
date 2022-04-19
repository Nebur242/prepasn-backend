import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseContentDto } from './create-base-content.dto';

export class UpdateBaseContentDto extends PartialType(CreateBaseContentDto) {}
