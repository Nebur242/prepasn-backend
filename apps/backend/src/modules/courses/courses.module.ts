import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesRepository } from './repositories/course.repository';
import { GradesModule } from '../grades/grades.module';
import { DocumentsModule } from '../documents/documents.module';
import { CategoriesModule } from '../categories/categories.module';
import { AuthModule } from '../auth/auth.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CoursesRepository]),
    GradesModule,
    DocumentsModule,
    CategoriesModule,
    SubscriptionsModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
