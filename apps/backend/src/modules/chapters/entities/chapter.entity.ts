import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { Course } from '@prepa-sn/backend/modules/courses/entities/course.entity';
import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Document } from '../../documents/entities/document.entity';

@Entity()
export class Chapter extends BaseContent {
  //has one and only course
  @OneToOne(() => Course, (course) => course.chapters)
  @JoinColumn()
  course: Course;

  @ManyToMany(() => Document)
  @JoinTable()
  documents: Document[];
}
