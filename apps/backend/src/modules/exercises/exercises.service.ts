import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { ChaptersService } from '../chapters/chapters.service';
import { User } from '../users/entities/user.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { ExercisesRepository } from './repositories/exercise.repository';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly exercisesRepository: ExercisesRepository,
    private readonly chaptersService: ChaptersService
  ) {}

  createEntity(entityLike: DeepPartial<Exercise>): Exercise {
    return this.exercisesRepository.create(entityLike);
  }

  async create(
    createExerciseDto: CreateExerciseDto & {
      createdBy: User;
    }
  ) {
    const exercise = this.exercisesRepository.create({
      ...createExerciseDto,
      chapter: this.chaptersService.createEntity({
        id: createExerciseDto.chapter,
      }),
    });
    return this.exercisesRepository.save(exercise);
  }

  findAll(filter: FindManyOptions<Exercise> = {}) {
    return this.exercisesRepository.find(filter);
  }

  paginate(
    options: IPaginationOptions,
    filter: FilterDto
  ): Promise<Pagination<Exercise>> {
    return paginate<Exercise>(this.exercisesRepository, options, filter);
  }

  async findOne(id: number) {
    const found = await this.exercisesRepository.findOne(id, {
      relations: ['image', 'video', 'chapter', 'questions'],
    });
    if (!found) throw new NotFoundException(`Exercise with id ${id} not found`);
    return found;
  }

  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto & {
      updatedBy: User;
    }
  ) {
    const exercise: Exercise = await this.findOne(id);
    return this.exercisesRepository.save({
      ...exercise,
      ...updateExerciseDto,
      chapter: updateExerciseDto.chapter
        ? this.chaptersService.createEntity({
            id: updateExerciseDto.chapter,
          })
        : exercise.chapter,
    });
  }

  async remove(id: number) {
    const found: Exercise = await this.findOne(id);
    return this.exercisesRepository.remove(found);
  }
}
