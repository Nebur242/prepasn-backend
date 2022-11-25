import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { CoursesModule } from '../courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './repository/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository]), CoursesModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
