import { BaseContent } from '../../../common/entities/base-content.entity';
import { Entity, JoinTable, OneToOne } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Chapter extends BaseContent {
  //has one and only course
  @OneToOne(() => Course, (course) => course.chapters)
  @JoinTable()
  course: Course;
}
