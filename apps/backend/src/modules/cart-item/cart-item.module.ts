import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsRepository } from './repositories/cart-item.repository';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    AuthModule,
    CoursesModule,
    TypeOrmModule.forFeature([CartItemsRepository])
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService]
})
export class CartItemModule {}
