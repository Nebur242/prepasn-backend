import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from './entities/classroom.entity';
import { ClassroomsRepository } from './repositories/classroom.repository';

@Injectable()
export class ClassroomsService {
  constructor(private readonly classroomsRepository: ClassroomsRepository) {}

  createEntity(entityLike: DeepPartial<Classroom>): Classroom {
    return this.classroomsRepository.create(entityLike);
  }

  create(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    const classroom = this.createEntity(createClassroomDto);
    return this.classroomsRepository.save(classroom);
  }

  findAll(filter: FindManyOptions<Classroom> = {}): Promise<Classroom[]> {
    return this.classroomsRepository.find({
      ...filter,
    });
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Classroom>> {
    return paginate<Classroom>(this.classroomsRepository, options);
  }

  async findOne(id: number): Promise<Classroom> {
    const classroom = await this.classroomsRepository.findOne(id);
    if (!classroom)
      throw new NotFoundException(`Classroom with id ${id} not found`);
    return classroom;
  }

  async update(
    id: number,
    updateClassroomDto: UpdateClassroomDto
  ): Promise<Classroom> {
    const classroom = await this.findOne(id);
    await this.classroomsRepository.update(classroom.id, updateClassroomDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Classroom> {
    const classroom = await this.findOne(id);
    await this.classroomsRepository.delete(classroom.id);
    return this.findOne(id);
  }
}
