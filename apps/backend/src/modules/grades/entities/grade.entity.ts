import { BaseContent } from '../../../common/entities/base-content.entity';
import { Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Grade extends BaseContent {
  @OneToMany(() => Grade, (grade) => grade.parent, { cascade: true })
  children: Grade[];

  @ManyToOne(() => Grade, (grade) => grade.children, { onDelete: 'CASCADE' })
  parent: Grade;

  @ManyToMany(() => Course, (course) => course.grades, { cascade: true })
  courses: Course[];
}
