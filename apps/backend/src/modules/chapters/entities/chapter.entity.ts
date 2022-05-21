import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Course } from '@prepa-sn/backend/modules/courses/entities/course.entity';
import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Document } from '../../documents/entities/document.entity';

@Entity()
export class Chapter extends BaseContent {
  @ManyToOne(() => Course, (course) => course.chapters)
  course: Course;

  @ManyToMany(() => Document)
  @JoinTable()
  documents: Document[];
}
