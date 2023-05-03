import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { OrdersModule } from '../orders/orders.module';
import { PaymentsModule } from '../payments/payments.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { OrderItemModule } from '../order-item/order-item.module';
import { CoursesModule } from '../courses/courses.module';
import { CartItemModule } from '../cart-item/cart-item.module';

@Module({
  imports: [
    OrdersModule,
    OrderItemModule,
    PaymentsModule,
    SubscriptionsModule,
    CoursesModule,
    CartItemModule
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService]
})
export class CheckoutModule {}
