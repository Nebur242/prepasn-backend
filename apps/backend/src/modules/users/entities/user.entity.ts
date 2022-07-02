import { Role, Status } from '@prepa-sn/shared/enums';
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
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, default: null })
  birthDate?: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

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
