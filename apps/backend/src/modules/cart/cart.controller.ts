import {
  BadRequestException,
  Body,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Authenticated } from '../auth/roles-auth.guard';
import { User } from '../users/entities/user.entity';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { FilterDto } from './dto/filter.dto';

@ControllerWithApiTags('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto, @Claims() user: User) {
    return this.cartService.create({
      ...createCartDto,
      createdBy: user,
    });
  }

  @Get()
  @Authenticated()
  findAll(@Query() filterDto: FilterDto & IPaginationOptions) {
    const { page = 1, limit = 10, ...filter } = filterDto;
    return this.cartService.paginate(
      {
        page,
        limit,
        route: '/cart',
      },
      filter
    );
  }
}
