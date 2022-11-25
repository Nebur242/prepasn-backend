import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { Authenticated } from '../auth/roles-auth.guard';
import { User } from '../users/entities/user.entity';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PaymentIntentsDto } from './dto/paymentIntent.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @Authenticated()
  create(
    @Body() createCheckoutDto: CreateCheckoutDto,
    @Claims() subscriber: User
  ) {
    return this.checkoutService.create({ ...createCheckoutDto, subscriber });
  }

  @Post('/paymentIntents')
  createPaymentIntent(@Body() paymentIntentsDto: PaymentIntentsDto) {
    console.log(paymentIntentsDto);
    return this.checkoutService.createPaymentIntent(paymentIntentsDto);
  }

  @Get()
  findAll() {
    return this.checkoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkoutService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckoutDto: UpdateCheckoutDto
  ) {
    return this.checkoutService.update(+id, updateCheckoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutService.remove(+id);
  }
}
