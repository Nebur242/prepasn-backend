import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsRepository } from './repositories/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsRepository])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
