import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from './entities/chapter.entity';
import { ChaptersRepository } from './repositories/chapter.repository';

@Injectable()
export class ChaptersService {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly chaptersRepository: ChaptersRepository
  ) {}

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const course = await this.coursesService.findOne(createChapterDto.course);
    const chapter = this.chaptersRepository.create({
      ...createChapterDto,
      course,
    });
    return this.chaptersRepository.save(chapter);
  }

  findAll(filter: FindManyOptions<Chapter> = {}): Promise<Chapter[]> {
    return this.chaptersRepository.find(filter);
  }

  async findOne(id: number): Promise<Chapter> {
    const found = await this.chaptersRepository.findOne(id);
    if (!found) throw new NotFoundException(`Chapter with id ${id} not found`);
    return found;
  }

  async update(
    id: number,
    updateChapterDto: UpdateChapterDto
  ): Promise<Chapter> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { course, ...updated } = updateChapterDto;
    await this.chaptersRepository.update(id, updated);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Chapter> {
    const found = await this.findOne(id);
    return this.chaptersRepository.remove(found);
  }
}
