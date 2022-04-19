// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BaseContent } from 'apps/backend/src/common/entities/base-content.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Grade } from '../../grades/entities/grade.entity';

@Entity()
export class Course extends BaseContent {
  @Column({ nullable: false, unique: true })
  override title: string;

  //has many grades
  @ManyToMany(() => Grade, (grade) => grade.courses)
  @JoinTable()
  grades: Grade[];
}
