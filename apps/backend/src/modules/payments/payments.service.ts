import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentRepository } from './repositories/payment.repository';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly ordersService: OrdersService
  ) {}

  createEntity(entityLike: DeepPartial<Payment>): Payment {
    return this.paymentRepository.create(entityLike);
  }

  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      order: this.ordersService.createEntity({ id: createPaymentDto.order }),
    });
    return this.paymentRepository.save(payment);
  }

  findAll(filter: FindManyOptions<Payment> = {}) {
    return this.paymentRepository.find({
      ...filter,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
