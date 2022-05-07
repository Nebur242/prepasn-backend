import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { DocumentsService } from '../documents/documents.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';
import { GradesRepository } from './repositories/grade.repository';

@Injectable()
export class GradesService {
  constructor(
    private readonly gradesRepository: GradesRepository,
    private readonly documentsService: DocumentsService
  ) {}

  createEntity(entityLike: DeepPartial<Grade>): Grade {
    return this.gradesRepository.create(entityLike);
  }

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    const grade = this.createEntity({
      ...createGradeDto,
      image: createGradeDto.image
        ? this.documentsService.createEntity({
            id: createGradeDto.image,
          })
        : null,
      video: createGradeDto.video
        ? this.documentsService.createEntity({
            id: createGradeDto.video,
          })
        : null,
      parent: {
        id: createGradeDto.parent,
      },
    });
    return this.gradesRepository.save(grade);
  }

  findAll(filter: FindManyOptions<Grade> = {}): Promise<Grade[]> {
    return this.gradesRepository.find({
      ...filter,
      relations: ['parent'],
    });
  }

  async findOne(id: number): Promise<Grade> {
    const grade = await this.gradesRepository.findOne(id, {
      relations: ['parent', 'courses', 'children', 'image', 'video'],
    });
    if (!grade) throw new NotFoundException(`Grade with id ${id} not found`);
    return grade;
  }

  async update(id: number, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    const grade = await this.findOne(id);
    await this.gradesRepository.update(grade.id, {
      ...updateGradeDto,
      image: updateGradeDto.image
        ? this.documentsService.createEntity({
            id: updateGradeDto.image,
          })
        : null,
      video: updateGradeDto.video
        ? this.documentsService.createEntity({
            id: updateGradeDto.video,
          })
        : null,
      parent: {
        id: updateGradeDto.parent,
      },
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<Grade> {
    const grade = await this.findOne(id);
    return this.gradesRepository.remove(grade);
  }
}
