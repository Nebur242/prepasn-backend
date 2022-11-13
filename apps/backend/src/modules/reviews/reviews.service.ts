import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { User } from '../users/entities/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { FilterDto } from './dto/filter-reviews.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { ReviewRepository } from './repository/review.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly coursesService: CoursesService
  ) {}

  async create(
    createReviewDto: CreateReviewDto & { author: User }
  ): Promise<Review> {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      course: this.coursesService.createEntity({
        id: createReviewDto.course,
      }),
    });
    return this.reviewRepository.save(review);
  }

  async findAll(filter: FilterDto) {
    return this.reviewRepository.find({
      where: {
        course: await this.coursesService.findOne(filter.course),
      },
      relations: ['course', 'author'],
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne(id, {
      relations: ['author', 'course'],
    });
    if (!review) throw new NotFoundException(`review with id ${id} not found`);
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
