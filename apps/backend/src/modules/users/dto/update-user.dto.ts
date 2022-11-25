import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Document } from '../../documents/entities/document.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  profileId?: Document['id'];
}
