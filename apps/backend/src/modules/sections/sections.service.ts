import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { ChaptersService } from '../chapters/chapters.service';
import { User } from '../users/entities/user.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateExerciseDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { SectionsRepository } from './repositories/sections.repository';

@Injectable()
export class SectionsService {
  constructor(
    private readonly exercisesRepository: SectionsRepository,
    private readonly chaptersService: ChaptersService
  ) {}

  createEntity(entityLike: DeepPartial<Section>): Section {
    return this.exercisesRepository.create(entityLike);
  }

  async create(
    createExerciseDto: CreateSectionDto & {
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

  findAll(filter: FindManyOptions<Section> = {}) {
    return this.exercisesRepository.find(filter);
  }

  paginate(
    options: IPaginationOptions,
    filter: FilterDto
  ): Promise<Pagination<Section>> {
    return paginate<Section>(this.exercisesRepository, options, {
      where: filter,
      relations: ['image', 'video', 'createdBy', 'chapter'],
    });
  }

  async findOne(id: number) {
    const found = await this.exercisesRepository.findOne(id, {
      relations: ['image', 'video', 'chapter'],
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
    const exercise: Section = await this.findOne(id);
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
    const found: Section = await this.findOne(id);
    return this.exercisesRepository.remove(found);
  }
}
