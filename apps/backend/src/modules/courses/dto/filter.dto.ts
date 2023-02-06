import { IsOptional } from 'class-validator';

export class FilterDto {
  @IsOptional()
  createdBy: string;
}
