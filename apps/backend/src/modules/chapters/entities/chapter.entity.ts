import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '@prepa-sn/backend/modules/courses/entities/course.entity';
import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Document } from '../../documents/entities/document.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { Section } from '../../sections/entities/section.entity';

@Entity()
export class Chapter extends BaseContent {
  @ManyToOne(() => Course, (course) => course.chapters, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => Exercise, (exercise) => exercise.chapter)
  exercises?: Exercise[];

  @ManyToMany(() => Document)
  @JoinTable()
  documents: Document[];

  @OneToMany(() => Section, (chapter) => chapter.chapter)
  sections?: Section[];
}
