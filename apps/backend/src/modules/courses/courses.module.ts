import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesRepository } from './repositories/course.repository';
import { GradesModule } from '../grades/grades.module';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesRepository]), GradesModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
