import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsDefined()
  uid: string;

  @ApiProperty()
  @IsDefined()
  hasAgreedWithTermsAndConditions: boolean;
}
