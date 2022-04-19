import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { GradesService } from '../grades/grades.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { CoursesRepository } from './repositories/course.repository';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly gradesService: GradesService
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const grades = await this.gradesService.findAll({
      where: createCourseDto.grades.map((id) => ({ id })),
    });
    const course = this.coursesRepository.create({
      ...createCourseDto,
      grades: grades,
    });
    return this.coursesRepository.save(course);
  }

  findAll(filter: FindManyOptions<Course> = {}) {
    return this.coursesRepository.find({
      ...filter,
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne(id, {
      relations: ['grades'],
    });
    if (!course) throw new NotFoundException(`Course with id ${id} not found`);
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);

    let updatedCourse: Course = {
      ...course,
      ...updateCourseDto,
      grades: course.grades,
    };

    if (updateCourseDto.grades) {
      const grades =
        updateCourseDto.grades.length > 0
          ? await this.gradesService.findAll({
              where: updateCourseDto.grades.map((id) => ({ id })),
            })
          : [];
      updatedCourse = {
        ...updatedCourse,
        grades,
      };
    }

    await this.coursesRepository.save(updatedCourse);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Course> {
    const course = await this.findOne(id);
    await this.coursesRepository.remove(course);
    return course;
  }
}
