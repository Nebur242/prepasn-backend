import { Status } from '@prepa-sn/shared/enums';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true, default: null })
  description?: string;

  @Column({ nullable: true, default: null })
  facebook?: string;

  @Column({ nullable: true, default: null })
  linkedin?: string;

  @Column({ nullable: true, default: null })
  twitter?: string;

  @Column({ nullable: true, default: null })
  birthDate?: Date;

  @Column({ nullable: false, default: true })
  hasAgreedWithTermsAndConditions: boolean;

  @Column({ unique: true })
  uid: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
