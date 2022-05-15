import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
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

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const chapter = this.createEntity({
      ...createChapterDto,
      course: this.coursesService.createEntity({
        id: createChapterDto.course,
      }),
    });
    return this.chaptersRepository.save(chapter);
  }

  findAll(filter: FindManyOptions<Chapter> = {}): Promise<Chapter[]> {
    return this.chaptersRepository.find(filter);
  }

  async findOne(id: number): Promise<Chapter> {
    const found = await this.chaptersRepository.findOne(id, {
      relations: ['documents', 'image', 'video', 'course'],
    });
    if (!found) throw new NotFoundException(`Chapter with id ${id} not found`);
    return found;
  }

  async update(
    id: number,
    updateChapterDto: UpdateChapterDto
  ): Promise<Chapter> {
    const chapter: Chapter = await this.findOne(id);
    return this.chaptersRepository.save({
      ...chapter,
      ...updateChapterDto,
    });
  }

  async remove(id: number): Promise<Chapter> {
    const found: Chapter = await this.findOne(id);
    return this.chaptersRepository.remove(found);
  }
}
