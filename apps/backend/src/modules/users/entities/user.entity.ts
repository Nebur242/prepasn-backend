import { Role, Status } from '@prepa-sn/shared/enums';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Document } from '../../documents/entities/document.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Document)
  @JoinColumn()
  profile?: Document | null;

  @Column({ nullable: true, default: null })
  description: string;

  @Column({ nullable: true, default: null })
  facebook: string;

  @Column({ nullable: true, default: null })
  linkedin: string;

  @Column({ nullable: true, default: null })
  twitter: string;

  @Column({ nullable: true, default: null })
  birthDate?: Date;

  @Column({ unique: true })
  email: string;

  @Column({ default: null })
  phone?: string;

  @Column({ unique: true })
  uid: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({ type: 'enum', array: true, enum: Role })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
