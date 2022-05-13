import { Document } from '@prepa-sn/backend/modules/documents/entities/document.entity';
import { LANGUAGE, Status } from '@prepa-sn/shared/enums';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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

  @Column({ nullable: true, default: null })
  @OneToOne(() => Document)
  @JoinColumn()
  image?: Document | null;

  @Column({ nullable: true, default: null })
  @OneToOne(() => Document)
  @JoinColumn()
  video?: Document | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
