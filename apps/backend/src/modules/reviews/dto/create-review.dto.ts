import { IsDefined, IsOptional } from 'class-validator';
import { Course } from '../../courses/entities/course.entity';

export class CreateReviewDto {
  @IsDefined()
  title: string;

  @IsDefined()
  description: string;

  @IsDefined()
  course: Course['id'];

  @IsOptional()
  stars: number;
}
