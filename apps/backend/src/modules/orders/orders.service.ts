import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { OrderItemService } from '../order-item/order-item.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemService: OrderItemService
  ) {}

  createEntity(entityLike: DeepPartial<Order>): Order {
    return this.orderRepository.create(entityLike);
  }

  create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create({
      ...createOrderDto,
      items: createOrderDto.items.map((id) =>
        this.orderItemService.createEntity({ id })
      ),
    });
    return this.orderRepository.save(order);
  }

  findAll(filter: FindManyOptions<Order> = {}) {
    return this.orderRepository.find({
      ...filter,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
