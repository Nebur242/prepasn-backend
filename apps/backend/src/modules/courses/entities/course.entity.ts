import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Chapter } from '@prepa-sn/backend/modules/chapters/entities/chapter.entity';
import { Grade } from '@prepa-sn/backend/modules/grades/entities/grade.entity';
import { Document } from '../../documents/entities/document.entity';

@Entity()
export class Course extends BaseContent {
  //has many grades

  @ManyToMany(() => Grade, (grade) => grade.courses)
  @JoinTable()
  grades: Grade[];

  @Column({ nullable: true, default: null })
  @OneToMany(() => Chapter, (chapter: Chapter) => chapter.course)
  @JoinColumn()
  chapters?: Chapter[];

  @Column({ nullable: true, default: null })
  @ManyToMany(() => Document)
  @JoinTable()
  documents?: Document[];
}
