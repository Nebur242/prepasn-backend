import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prepa-sn/shared/enums';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  profile?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  zipcode?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  youtube?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiProperty({
    required: false,
  })
  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    required: false,
    enum: [...Object.values(Status)],
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
