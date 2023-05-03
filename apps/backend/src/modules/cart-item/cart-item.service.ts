import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { User } from '../users/entities/user.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';
import { CartItemsRepository } from './repositories/cart-item.repository';
import { Status } from '@prepa-sn/shared/enums';

@Injectable()
export class CartItemService {
  constructor(
    private readonly cartItemsRepository: CartItemsRepository,
    private readonly coursesService: CoursesService
  ) {}

  createEntity(entityLike: DeepPartial<CartItem>): CartItem {
    return this.cartItemsRepository.create(entityLike);
  }

  async create(createCartItemDto: CreateCartItemDto & { createdBy: User }) {
    const all = await this.findAll({
      where: {
        course: this.coursesService.createEntity({
          id: createCartItemDto.course
        }),
        createdBy: createCartItemDto.createdBy
      }
    });

    if (all.length > 0) return all[0];

    const cartItem = this.createEntity({
      course: this.coursesService.createEntity({
        id: createCartItemDto.course
      }),
      createdBy: createCartItemDto.createdBy
    });
    return this.cartItemsRepository.save(cartItem);
  }

  findAll(filter: FindManyOptions<CartItem> = {}): Promise<CartItem[]> {
    return this.cartItemsRepository.find({
      ...filter,
      relations: ['course', 'course.image', 'course.video', 'createdBy']
    });
  }

  async updateOneStatus(id: number, status: Status) {
    const found = await this.findOne(id);
    return this.cartItemsRepository.save({
      ...found,
      status
    });
  }

  async findOne(id: number): Promise<CartItem> {
    const found = await this.cartItemsRepository.findOne(id, {
      relations: ['course', 'course.image', 'course.video', 'createdBy']
    });
    if (!found)
      throw new NotFoundException(`Cart Item with id ${id} not found`);
    return found;
  }

  async remove(id: number): Promise<CartItem> {
    const found = await this.findOne(id);
    return this.cartItemsRepository.remove(found);
  }
}
