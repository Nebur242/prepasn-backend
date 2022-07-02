import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  password: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
}
