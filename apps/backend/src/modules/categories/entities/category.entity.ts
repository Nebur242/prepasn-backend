import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Entity, ManyToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Category extends BaseContent {
  @ManyToMany(() => Course, (course: Course) => course.categories, {
    cascade: true,
  })
  courses: Course[];
}
