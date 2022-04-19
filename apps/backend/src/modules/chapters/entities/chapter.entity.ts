import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Entity, JoinTable, OneToOne } from 'typeorm';
import { Course } from '@prepa-sn/backend/modules/courses/entities/course.entity';

@Entity()
export class Chapter extends BaseContent {
  //has one and only course
  @OneToOne(() => Course, (course) => course.chapters)
  @JoinTable()
  course: Course;
}
