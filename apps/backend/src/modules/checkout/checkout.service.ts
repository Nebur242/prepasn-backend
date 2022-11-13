import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PaymentIntentsDto } from './dto/paymentIntent.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import Stripe from 'stripe';
import { OrderItemService } from '../order-item/order-item.service';
import { PaymentsService } from '../payments/payments.service';
import { OrdersService } from '../orders/orders.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { OrderStatus } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { CoursesService } from '../courses/courses.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

@Injectable()
export class CheckoutService {
  constructor(
    private readonly orderItemService: OrderItemService,
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly coursesService: CoursesService
  ) {}

  async create(createCheckoutDto: CreateCheckoutDto & { subscriber: User }) {
    //create order items
    const orderitems = await Promise.all(
      createCheckoutDto.items.map((item) => this.orderItemService.create(item))
    );
    //create order
    const order = await this.ordersService.create({
      total: createCheckoutDto.total,
      subTotal: createCheckoutDto.total,
      notes: createCheckoutDto.form.notes,
      items: orderitems.map((item) => item.id),
      status: OrderStatus.IN_PROCESS,
      orderedBy: createCheckoutDto.subscriber,
    });
    //create payment
    const payment = await this.paymentsService.create({
      total: createCheckoutDto.total,
      details: '',
      order: order.id,
      paidBy: createCheckoutDto.subscriber,
    });
    //create subscription
    const subscriptions = await Promise.all(
      createCheckoutDto.items.map((item) =>
        this.subscriptionsService.create({
          course: this.coursesService.createEntity({
            id: item.course,
          }),
          subscriber: createCheckoutDto.subscriber,
        })
      )
    );
    return {
      orderitems,
      payment,
      order,
      subscriptions,
    };
  }

  findAll() {
    return `This action returns all checkout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkout`;
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    return `This action updates a #${id} checkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }

  async createPaymentIntent(paymentIntentsDto: PaymentIntentsDto) {
    try {
      const { amount, currency } = paymentIntentsDto;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      return paymentIntent;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
