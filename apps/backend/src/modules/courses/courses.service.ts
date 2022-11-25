import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions, IsNull, Not } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { GradesService } from '../grades/grades.service';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { User } from '../users/entities/user.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { CoursesRepository } from './repositories/course.repository';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly gradesService: GradesService,
    private readonly categoriesService: CategoriesService,
    private readonly subscriptionsService: SubscriptionsService
  ) {}

  createEntity(entityLike: DeepPartial<Course>): Course {
    return this.coursesRepository.create(entityLike);
  }

  async create(
    createCourseDto: CreateCourseDto & {
      createdBy: User | null;
    }
  ): Promise<Course> {
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

  paginate(
    options: IPaginationOptions,
    filter: FilterDto
  ): Promise<Pagination<Course>> {
    return paginate<Course>(this.coursesRepository, options, {
      where: {
        ...filter,
      },
      relations: [
        'image',
        'video',
        'grades',
        'documents',
        'categories',
        'createdBy',
      ],
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne(id, {
      relations: [
        'image',
        'video',
        'grades',
        'documents',
        'chapters',
        'categories',
        'createdBy',
      ],
    });
    if (!course) throw new NotFoundException(`Course with id ${id} not found`);
    return course;
  }

  async findOneSubscriptions(id: number): Promise<Subscription[]> {
    const course = await this.findOne(id);
    const subscriptions = await this.subscriptionsService.findAll({
      where: {
        course,
        subscriber: Not(IsNull()),
      },
      relations: ['course', 'subscriber'],
    });
    return subscriptions;
  }

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto & {
      updatedBy: User | null;
    }
  ): Promise<Course> {
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
