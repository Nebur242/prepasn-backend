import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemRepository } from './repositories/order-item.repository';

@Injectable()
export class OrderItemService {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
    private readonly coursesService: CoursesService
  ) {}

  createEntity(entityLike: DeepPartial<OrderItem>): OrderItem {
    return this.orderItemRepository.create(entityLike);
  }

  create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.orderItemRepository.create({
      ...createOrderItemDto,
      course: this.coursesService.createEntity({
        id: createOrderItemDto.course,
      }),
    });
    return this.orderItemRepository.save(orderItem);
  }

  findAll(filter: FindManyOptions<OrderItem> = {}) {
    return this.orderItemRepository.find({
      ...filter,
    });
  }

  async findOne(id: number) {
    const orderItem = await this.orderItemRepository.findOne(id);
    if (!orderItem)
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    return orderItem;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  async remove(id: number) {
    const orderItem = await this.findOne(id);
    return this.orderItemRepository.remove(orderItem);
  }
}
