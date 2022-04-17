/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { BaseContent } from 'apps/backend/src/common/entities/base-content.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Grade extends BaseContent {
  @Column({ nullable: false, unique: true })
  override title: string;

  @OneToOne(() => Grade, (grade) => grade.id, { onDelete: 'CASCADE' })
  @JoinTable()
  parent: Grade;

  @ManyToMany(() => Course, (course) => course.grades, { cascade: true })
  courses: Course[];
}
