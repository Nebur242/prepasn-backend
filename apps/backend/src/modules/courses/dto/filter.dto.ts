import { IsOptional } from 'class-validator';

export class FilterDto {
  @IsOptional()
  category?: string;

  @IsOptional()
  createdBy: string;
}
