import { BaseContent } from '../../../common/entities/base-content.entity';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Grade } from '../../grades/entities/grade.entity';

@Entity()
export class Course extends BaseContent {
  //has many grades
  @ManyToMany(() => Grade, (grade) => grade.courses)
  @JoinTable()
  grades: Grade[];

  @OneToMany(() => Chapter, (chapter) => chapter.course)
  @JoinTable()
  chapters: Chapter[];
}
