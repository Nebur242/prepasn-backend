import { Status } from '@prepa-sn/shared/enums';
import { IsEnum } from 'class-validator';

export class UpdateUserStatusDto {
  @IsEnum(Status)
  status: Status;
}
