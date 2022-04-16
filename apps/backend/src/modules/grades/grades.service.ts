import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';
import { GradesRepository } from './repositories/grade.repository';

@Injectable()
export class GradesService {
  constructor(private readonly gradesRepository: GradesRepository) {}

  async create(createSectionDto: CreateGradeDto): Promise<Grade> {
    const section = this.gradesRepository.create({
      ...createSectionDto,
      parent: createSectionDto.parent
        ? await this.findOne(createSectionDto.parent)
        : null,
    });
    return this.gradesRepository.save(section);
  }

  findAll(): Promise<Grade[]> {
    return this.gradesRepository.find({
      relations: ['parent'],
    });
  }

  async findOne(id: number): Promise<Grade> {
    const grade = await this.gradesRepository.findOne(id, {
      relations: ['parent'],
    });
    if (!grade) throw new NotFoundException(`Section with id ${id} not found`);
    return grade;
  }

  async update(id: number, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    const section = await this.findOne(id);
    await this.gradesRepository.update(section.id, {
      ...updateGradeDto,
      parent: updateGradeDto.parent
        ? await this.findOne(updateGradeDto.parent)
        : null,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<Grade> {
    const section = await this.findOne(id);
    await this.gradesRepository.remove(section);
    return section;
  }
}
