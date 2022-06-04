import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Chapter } from '@prepa-sn/backend/modules/chapters/entities/chapter.entity';
import { Grade } from '@prepa-sn/backend/modules/grades/entities/grade.entity';
import { Document } from '../../documents/entities/document.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Course extends BaseContent {
  //has many grades

  @ManyToMany(() => Grade, (grade) => grade.courses)
  @JoinTable()
  grades: Grade[];

  @ManyToMany(() => Category, (grade) => grade.courses)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Chapter, (chapter) => chapter.course)
  chapters?: Chapter[];

  @ManyToMany(() => Document)
  @JoinTable()
  documents?: Document[];
}
