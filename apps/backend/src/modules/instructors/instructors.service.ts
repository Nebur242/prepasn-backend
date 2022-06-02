import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserStatusDto } from '@prepa-sn/backend/common/dtos/update-user-status.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Instructor } from './entities/instructor.entity';
import { InstructorsRepository } from './repositories/instructor.repository';

@Injectable()
export class InstructorsService {
  constructor(private readonly instructorsRepository: InstructorsRepository) {}

  create(createInstructorDto: CreateInstructorDto) {
    const instructor = this.instructorsRepository.create(createInstructorDto);
    return this.instructorsRepository.save(instructor);
  }

  findAll(filter: FindManyOptions<Instructor> = {}) {
    return this.instructorsRepository.find(filter);
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Instructor>> {
    return paginate<Instructor>(this.instructorsRepository, options);
  }

  async findOne(id: number): Promise<Instructor> {
    const instructor = await this.instructorsRepository.findOne(id);
    if (!instructor)
      throw new NotFoundException(`Instructor with id ${id} not found`);
    return instructor;
  }

  async update(id: number, updateInstructorDto: UpdateInstructorDto) {
    const instructor = await this.findOne(id);
    await this.instructorsRepository.update(instructor.id, updateInstructorDto);
    return this.findOne(id);
  }

  async updateStatus(id: number, updateUserStatusDto: UpdateUserStatusDto) {
    const instructor = await this.findOne(id);
    await this.instructorsRepository.update(instructor.id, updateUserStatusDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Instructor> {
    const instructor = await this.findOne(id);
    return this.instructorsRepository.remove(instructor);
  }
}
