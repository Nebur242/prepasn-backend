import { Document } from '@prepa-sn/backend/modules/documents/entities/document.entity';
import { LANGUAGE, Status } from '@prepa-sn/shared/enums';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

export abstract class BaseContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  description?: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({ type: 'enum', enum: LANGUAGE, default: LANGUAGE.FR })
  language: LANGUAGE.FR;

  @ManyToOne(() => Document)
  @JoinColumn()
  image?: Document | null;

  @ManyToOne(() => Document)
  @JoinColumn()
  video?: Document | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
