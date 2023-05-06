import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination
} from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { User } from '../users/entities/user.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from './entities/chapter.entity';
import { ChaptersRepository } from './repositories/chapter.repository';

@Injectable()
export class ChaptersService {
  constructor(
    private readonly chaptersRepository: ChaptersRepository,
    private readonly coursesService: CoursesService
  ) {}

  createEntity(entityLike: DeepPartial<Chapter>): Chapter {
    return this.chaptersRepository.create(entityLike);
  }

  async create(
    createChapterDto: CreateChapterDto & {
      createdBy: User | null;
    }
  ): Promise<Chapter> {
    const chapter = this.createEntity({
      ...createChapterDto,
      course: this.coursesService.createEntity({
        id: createChapterDto.course
      })
    });
    return this.chaptersRepository.save(chapter);
  }

  findAll(filter: FindManyOptions<Chapter> = {}): Promise<Chapter[]> {
    return this.chaptersRepository.find(filter);
  }

  paginate(
    options: IPaginationOptions,
    filter: FilterDto
  ): Promise<Pagination<Chapter>> {
    return paginate<Chapter>(this.chaptersRepository, options, {
      where: filter,
      relations: ['image', 'video', 'createdBy', 'documents']
    });
  }

  async findOne(id: number): Promise<Chapter> {
    const found = await this.chaptersRepository.findOne(id, {
      relations: [
        'documents',
        'image',
        'video',
        'course',
        'exercises',
        'sections'
      ]
    });
    if (!found) throw new NotFoundException(`Chapter with id ${id} not found`);
    return found;
  }

  async update(
    id: number,
    updateChapterDto: UpdateChapterDto & {
      updatedBy: User | null;
    }
  ): Promise<Chapter> {
    const chapter: Chapter = await this.findOne(id);
    return this.chaptersRepository.save({
      ...chapter,
      ...updateChapterDto
    });
  }

  async remove(id: number): Promise<Chapter> {
    const found: Chapter = await this.findOne(id);
    return this.chaptersRepository.remove(found);
  }
}
