// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BaseContent } from 'apps/backend/src/common/entities/base-content.entity';
import { Column, Entity, JoinTable, OneToOne } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Chapter extends BaseContent {
  @Column({ nullable: false, unique: true })
  override title: string;

  //has one and only course
  @OneToOne(() => Course, (course) => course.chapters)
  @JoinTable()
  course: Course;
}
