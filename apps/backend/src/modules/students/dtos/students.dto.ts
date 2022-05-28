import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { CreateUserDto } from '@prepa-sn/backend/common/dtos/create-user.dto';

export class CreateStudentDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  override email: string;

  @ApiProperty()
  @IsDefined()
  password: string;
}

export class StudentDto extends CreateStudentDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  uid: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
