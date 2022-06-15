import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesRepository } from './repositories/exercise.repository';
import { ChaptersModule } from '../chapters/chapters.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExercisesRepository]), ChaptersModule],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
