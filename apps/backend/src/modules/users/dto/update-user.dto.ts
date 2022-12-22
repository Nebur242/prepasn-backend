import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prepa-sn/shared/enums';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  firstname?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  lastname?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  facebook?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  linkedin?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  twitter?: string;

  @ApiProperty({
    required: false,
  })
  @IsDateString()
  birthDate?: Date;

  @ApiProperty({
    required: false,
    enum: [...Object.values(Status)],
  })
  @IsEnum(Status)
  status?: Status;
}
