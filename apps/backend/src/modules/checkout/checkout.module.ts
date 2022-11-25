import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { OrdersModule } from '../orders/orders.module';
import { PaymentsModule } from '../payments/payments.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { OrderItemModule } from '../order-item/order-item.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    OrdersModule,
    OrderItemModule,
    PaymentsModule,
    SubscriptionsModule,
    CoursesModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
