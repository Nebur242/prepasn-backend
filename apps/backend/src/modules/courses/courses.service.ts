import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { GradesService } from '../grades/grades.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { CoursesRepository } from './repositories/course.repository';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly gradesService: GradesService,
    private readonly categoriesService: CategoriesService
  ) {}

  createEntity(entityLike: DeepPartial<Course>): Course {
    return this.coursesRepository.create(entityLike);
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create({
      ...createCourseDto,
      grades: createCourseDto.grades.map((id) => {
        return this.gradesService.createEntity({ id });
      }),
      categories: createCourseDto.categories.map((id) => {
        return this.categoriesService.createEntity({ id });
      }),
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
      relations: ['image', 'video', 'grades', 'documents', 'chapters'],
    });
    if (!course) throw new NotFoundException(`Course with id ${id} not found`);
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course: Course = await this.findOne(id);
    return this.coursesRepository.save({
      ...course,
      ...updateCourseDto,
      grades: updateCourseDto?.grades
        ? updateCourseDto?.grades.map((gradeId) =>
            this.gradesService.createEntity({
              id: gradeId,
            })
          )
        : course.grades,
      categories: updateCourseDto?.categories
        ? updateCourseDto?.categories.map((categoryId) =>
            this.gradesService.createEntity({
              id: categoryId,
            })
          )
        : course.categories,
    });
  }

  async remove(id: number): Promise<Course> {
    const course = await this.findOne(id);
    return this.coursesRepository.remove(course);
  }
}
