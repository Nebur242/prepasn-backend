import { Status } from '@prepa-sn/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';

export enum CartItemType {
  COURSE = 'course',
}

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CartItemType,
    nullable: false,
  })
  type: CartItemType;

  @ManyToOne(() => Course)
  item: Course;

  @Column()
  quantity: number;

  @ManyToOne(() => User)
  createdBy: User;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
