import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';

export enum SubscriptionState {
  PENDING = 'pending',
  IN_PROCESS = 'inProgress',
  FINISHED = 'finished',
  PASSED = 'passed',
  FAILED = 'failed',
}

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course;

  @ManyToOne(() => User)
  @JoinColumn()
  subscriber: User;

  @Column({
    type: 'enum',
    enum: SubscriptionState,
    nullable: false,
    default: SubscriptionState.PENDING,
  })
  state: SubscriptionState;

  @CreateDateColumn()
  subscribed: Date;
}
