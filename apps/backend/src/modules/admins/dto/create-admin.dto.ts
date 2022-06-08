import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@prepa-sn/backend/common/dtos/create-user.dto';
import { IsDefined, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  override email: string;

  @ApiProperty()
  @IsDefined()
  password: string;
}
