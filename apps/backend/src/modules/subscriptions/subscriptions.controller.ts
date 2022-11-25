import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { User } from '../users/entities/user.entity';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Authenticated } from '../auth/roles-auth.guard';
import { FilterDto } from './dto/filter.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  @Authenticated()
  findAll(
    @Query() filterDto: IPaginationOptions & FilterDto,
    @Claims() subscriber: User
  ) {
    const { page = 0, limit = 10, ...rest } = filterDto;
    return this.subscriptionsService.paginate(
      {
        page,
        limit,
        route: '/subscriptions',
      },
      {
        ...rest,
        subscriber: subscriber.id,
      }
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto
  ) {
    return this.subscriptionsService.update(+id, updateSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(+id);
  }
}
