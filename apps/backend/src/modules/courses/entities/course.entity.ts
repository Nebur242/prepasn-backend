import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Chapter } from '@prepa-sn/backend/modules/chapters/entities/chapter.entity';
import { Grade } from '@prepa-sn/backend/modules/grades/entities/grade.entity';

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
