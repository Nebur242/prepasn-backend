import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  details?: string;

  @CreateDateColumn()
  paid: Date;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;

  @ManyToOne(() => User)
  paidBy: User;
}
