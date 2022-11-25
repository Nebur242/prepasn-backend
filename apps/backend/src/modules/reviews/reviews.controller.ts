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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Authenticated } from '../auth/roles-auth.guard';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { Review } from './entities/review.entity';
import { FilterDto } from './dto/filter-reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Authenticated()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Claims() author: User
  ): Promise<Review> {
    return this.reviewsService.create({
      ...createReviewDto,
      author,
    });
  }

  @Get()
  findAll(@Query() filter: FilterDto) {
    return this.reviewsService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
