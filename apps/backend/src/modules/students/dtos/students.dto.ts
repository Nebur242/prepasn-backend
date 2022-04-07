import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Student } from '../entities/student.entity';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
}

export class StudentDto extends CreateStudentDto implements Student {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
