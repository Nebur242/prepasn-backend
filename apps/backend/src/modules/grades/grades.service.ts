import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';
import { GradesRepository } from './repositories/grade.repository';

@Injectable()
export class GradesService {
  constructor(private readonly gradesRepository: GradesRepository) {}

  createEntity(entityLike: DeepPartial<Grade>): Grade {
    return this.gradesRepository.create(entityLike);
  }

  async create(
    createGradeDto: CreateGradeDto & {
      createdBy: User;
    }
  ): Promise<Grade> {
    const grade = this.createEntity({
      ...createGradeDto,
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
      relations: [
        'parent',
        'courses',
        'children',
        'image',
        'video',
        'createdBy',
        'updatedBy',
      ],
    });
    if (!grade) throw new NotFoundException(`Grade with id ${id} not found`);
    return grade;
  }

  async update(
    id: number,
    updateGradeDto: UpdateGradeDto & {
      updatedBy: User;
    }
  ): Promise<Grade> {
    const grade = await this.findOne(id);
    await this.gradesRepository.update(grade.id, {
      ...updateGradeDto,
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
