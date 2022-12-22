import { Role } from '@prepa-sn/shared/enums';
import { Transform } from 'class-transformer';
import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.split(','))
  @IsEnum(Role, { each: true })
  roles: Role[];

  @ApiProperty()
  @IsOptional()
  page: number;

  @ApiProperty()
  @IsOptional()
  limit: number;
}

export class FilterCreateUserTypeDto {
  @IsDefined()
  @IsEnum(Role)
  type: Role;
}
