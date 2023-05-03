import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';
import { Status } from '@prepa-sn/shared/enums';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 1 })
  quantity: number;

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course;

  @Column({
    type: 'enum',
    nullable: false,
    enum: Status,
    default: Status.PENDING
  })
  status: Status;

  @ManyToOne(() => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
