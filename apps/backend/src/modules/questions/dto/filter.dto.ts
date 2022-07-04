import { IsNotEmpty, IsOptional } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsNotEmpty()
  exercise?: string | number;
}
