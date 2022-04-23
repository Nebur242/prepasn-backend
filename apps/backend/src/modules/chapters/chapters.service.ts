import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { DocumentsService } from '../documents/documents.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from './entities/chapter.entity';
import { ChaptersRepository } from './repositories/chapter.repository';

@Injectable()
export class ChaptersService {
  constructor(
    private readonly chaptersRepository: ChaptersRepository,
    private readonly documentsService: DocumentsService
  ) {}

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const chapter = this.chaptersRepository.create({
      ...createChapterDto,
      course: {
        id: createChapterDto.course,
      },
      documents: createChapterDto.documents.map((id) =>
        this.documentsService.createEntity({ id })
      ),
    });
    return this.chaptersRepository.save(chapter);
  }

  findAll(filter: FindManyOptions<Chapter> = {}): Promise<Chapter[]> {
    return this.chaptersRepository.find(filter);
  }

  async findOne(id: number): Promise<Chapter> {
    const found = await this.chaptersRepository.findOne(id, {
      relations: ['documents'],
    });
    if (!found) throw new NotFoundException(`Chapter with id ${id} not found`);
    return found;
  }

  async update(
    id: number,
    updateChapterDto: UpdateChapterDto
  ): Promise<Chapter> {
    const chapter: Chapter = await this.findOne(id);
    let updatedChapter: Chapter = {
      ...chapter,
      ...updateChapterDto,
      documents: chapter.documents,
    };
    if (updatedChapter.documents) {
      updatedChapter = {
        ...updatedChapter,
        documents: updateChapterDto.documents.map((id) =>
          this.documentsService.createEntity({ id })
        ),
      };
    }
    await this.chaptersRepository.update(id, updatedChapter);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Chapter> {
    const found: Chapter = await this.findOne(id);
    return this.chaptersRepository.remove(found);
  }
}
