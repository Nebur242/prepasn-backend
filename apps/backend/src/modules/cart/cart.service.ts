import { Injectable } from '@nestjs/common';
import { Status } from '@prepa-sn/shared/enums';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeepPartial } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { User } from '../users/entities/user.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { FilterDto } from './dto/filter.dto';
import { Cart } from './entities/cart.entity';
import { CartRepository } from './repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly coursesService: CoursesService
  ) {}

  createEntity(createCategoryDto: DeepPartial<Cart>) {
    return this.cartRepository.create(createCategoryDto);
  }

  async create(
    createCartDto: CreateCartDto & {
      createdBy: User;
    }
  ) {
    const exists = await this.cartRepository.find({
      where: {
        createdBy: createCartDto.createdBy,
        item: createCartDto.item,
        status: Status.PENDING,
      },
    });

    if (exists) {
      const { createdBy, item, type, ...rest } = createCartDto;
      return this.cartRepository.save({
        ...exists,
        ...rest,
      });
    }
    const cart = this.createEntity({
      ...createCartDto,
      item: this.coursesService.createEntity({
        id: createCartDto.item,
      }),
    });
    return this.cartRepository.save(cart);
  }

  paginate(
    options: IPaginationOptions,
    filter: FilterDto
  ): Promise<Pagination<Cart>> {
    return paginate<Cart>(this.cartRepository, options, {
      where: filter,
      relations: ['item', 'createdBy'],
    });
  }
}
