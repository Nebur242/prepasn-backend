import { BaseContent } from '@prepa-sn/backend/common/entities/base-content.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Classroom extends BaseContent {
  @Column({
    unique: true,
  })
  override title: string;
}
