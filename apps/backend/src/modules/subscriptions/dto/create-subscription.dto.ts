import { IsDefined } from 'class-validator';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';

export class CreateSubscriptionDto {
  @IsDefined()
  course: Course;

  @IsDefined()
  subscriber: User;
}
