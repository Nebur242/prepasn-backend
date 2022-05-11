import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prepa-sn/shared/enums';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateTestUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}

export class LoginTestUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
