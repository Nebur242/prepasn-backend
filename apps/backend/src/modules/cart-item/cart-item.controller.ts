import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { Authenticated } from '../auth/roles-auth.guard';
import { User } from '../users/entities/user.entity';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @Authenticated()
  create(
    @Body() createCartItemDto: CreateCartItemDto,
    @Claims() createdBy: User
  ) {
    return this.cartItemService.create({
      ...createCartItemDto,
      createdBy
    });
  }

  @Get()
  @Authenticated()
  findAll(@Claims() createdBy: User) {
    return this.cartItemService.findAll({
      where: {
        createdBy
        // status: Status.PENDING
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(+id);
  }
}
