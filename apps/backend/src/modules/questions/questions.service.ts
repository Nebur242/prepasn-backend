import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { ExercisesService } from '../exercises/exercises.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { QuestionsRepository } from './repositories/question.repository';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly exercisesService: ExercisesService
  ) {}

  createEntity(entityLike: DeepPartial<Question>): Question {
    return this.questionsRepository.create(entityLike);
  }

  create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionsRepository.create({
      ...createQuestionDto,
      exercise: this.exercisesService.createEntity({
        id: createQuestionDto.exercise,
      }),
    });
    return this.questionsRepository.save(question);
  }

  findAll(filter: FindManyOptions<Question> = {}) {
    return this.questionsRepository.find(filter);
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Question>> {
    return paginate<Question>(this.questionsRepository, options);
  }

  async findOne(id: number) {
    const found = await this.questionsRepository.findOne(id, {
      relations: ['documents', 'image', 'video', 'exercise'],
    });
    if (!found) throw new NotFoundException(`Exercise with id ${id} not found`);
    return found;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question: Question = await this.findOne(id);
    return this.questionsRepository.save({
      ...question,
      ...updateQuestionDto,
      exercise: updateQuestionDto.exercise
        ? this.exercisesService.createEntity({
            id: updateQuestionDto.exercise,
          })
        : question.exercise,
    });
  }

  async remove(id: number) {
    const found: Question = await this.findOne(id);
    return this.questionsRepository.remove(found);
  }
}
