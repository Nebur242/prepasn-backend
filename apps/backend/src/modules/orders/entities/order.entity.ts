import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { User } from '../../users/entities/user.entity';

export enum OrderStatus {
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  IN_PROCESS = 'in_process',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
  })
  status: OrderStatus;

  @Column()
  total: number;

  @Column({ default: 0 })
  subTotal: number;

  @Column()
  notes?: string;

  @CreateDateColumn()
  shipped: Date;

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => User)
  orderedBy: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  items?: OrderItem[];
}
