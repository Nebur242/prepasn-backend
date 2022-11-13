import { Injectable } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  createEntity(entityLike: DeepPartial<Subscription>): Subscription {
    return this.subscriptionRepository.create(entityLike);
  }

  create(createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = this.subscriptionRepository.create(
      createSubscriptionDto
    );
    return this.subscriptionRepository.save(subscription);
  }

  async findAll(filter: FindManyOptions<Subscription> = {}) {
    const subs = await this.subscriptionRepository.find({
      relations: ['subscriber'],
      ...filter,
    });
    return subs;
  }

  async paginate(
    options: IPaginationOptions,
    filter: FilterDto
  ): Promise<Pagination<Subscription>> {
    return paginate<Subscription>(this.subscriptionRepository, options, {
      where: filter,
      relations: ['subscriber', 'course', 'course.image'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
