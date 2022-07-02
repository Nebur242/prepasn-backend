import { Role } from '@prepa-sn/shared/enums';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class FilterDto extends UpdateUserDto {
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.split(','))
  @IsEnum(Role, { each: true })
  roles: Role[];

  @IsOptional()
  page: number | string;

  @IsOptional()
  limit: number | string;
}
