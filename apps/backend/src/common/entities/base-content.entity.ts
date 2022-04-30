import { LANGUAGE, Status } from '@prepa-sn/shared/enums';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  description?: string;

  @Column({ nullable: true, default: null })
  featuredImage?: string;

  @Column({ nullable: true, default: null })
  videoUrl?: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({ type: 'enum', enum: LANGUAGE, default: LANGUAGE.FR })
  language: LANGUAGE.FR;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
