import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Chapter } from '@prepa-sn/backend/modules/chapters/entities/chapter.entity';
import { Grade } from '@prepa-sn/backend/modules/grades/entities/grade.entity';
import { Document } from '../../documents/entities/document.entity';
import { Category } from '../../categories/entities/category.entity';
import { level } from '@prepa-sn/shared/enums';

@Entity()
export class Course extends BaseContent {
  //has many grades

  @Column({ default: false })
  isFree: boolean;

  @Column({ default: null })
  price: number;

  @Column({ default: null })
  overview: string;

  @Column({ default: 0 })
  duration: number;

  @Column({ default: '' })
  durationPeriod: string;

  @Column({
    type: 'enum',
    enum: level,
    default: level.EASY,
  })
  level: level;

  @ManyToMany(() => Grade, (grade) => grade.courses)
  @JoinTable()
  grades: Grade[];

  @ManyToMany(() => Category, (category) => category.courses)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Chapter, (chapter) => chapter.course)
  chapters?: Chapter[];

  @ManyToMany(() => Document)
  @JoinTable()
  documents?: Document[];
}
