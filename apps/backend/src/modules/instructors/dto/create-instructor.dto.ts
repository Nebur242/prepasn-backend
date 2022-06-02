import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '@prepa-sn/backend/common/dtos/create-user.dto';
import { IsDefined, IsEmail } from 'class-validator';

export class CreateInstructorDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  override email: string;

  @ApiProperty()
  @IsDefined()
  password: string;
}
