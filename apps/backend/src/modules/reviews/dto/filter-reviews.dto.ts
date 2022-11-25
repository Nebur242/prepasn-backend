import { IsDefined } from 'class-validator';
import { Course } from '../../courses/entities/course.entity';

export class FilterDto {
  @IsDefined()
  course: Course['id'];
}
