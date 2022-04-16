import { BaseContent } from 'apps/backend/src/common/entities/base-content.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Grade extends BaseContent {
  @Column({ nullable: false, unique: true })
  override title: string;

  @OneToOne(() => Grade, (grade) => grade.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  parent: Grade;
}
