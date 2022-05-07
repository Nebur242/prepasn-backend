import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { DocumentsService } from '../documents/documents.service';
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
    private readonly documentsService: DocumentsService
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create({
      ...createCourseDto,
      image: createCourseDto.image
        ? this.documentsService.createEntity({
            id: createCourseDto.image,
          })
        : null,
      video: createCourseDto.video
        ? this.documentsService.createEntity({
            id: createCourseDto.video,
          })
        : null,
      grades: createCourseDto.grades.map((id) =>
        this.gradesService.createEntity({ id })
      ),
      documents: createCourseDto.documents.map((id) =>
        this.documentsService.createEntity({ id })
      ),
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
      relations: ['grades', 'documents'],
    });
    if (!course) throw new NotFoundException(`Course with id ${id} not found`);
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course: Course = await this.findOne(id);

    let updatedCourse: Course = {
      ...course,
      ...updateCourseDto,
      image: updateCourseDto.image
        ? this.documentsService.createEntity({
            id: updateCourseDto.image,
          })
        : null,
      video: updateCourseDto.video
        ? this.documentsService.createEntity({
            id: updateCourseDto.video,
          })
        : null,
      grades: course.grades,
      documents: course.documents,
    };

    if (updateCourseDto.grades) {
      updatedCourse = {
        ...updatedCourse,
        grades: updateCourseDto.grades.map((id) =>
          this.gradesService.createEntity({ id })
        ),
      };
    }

    if (updateCourseDto.documents) {
      updatedCourse = {
        ...updatedCourse,
        documents: updateCourseDto.documents.map((id) =>
          this.documentsService.createEntity({ id })
        ),
      };
    }

    return this.coursesRepository.save(updatedCourse);
  }

  async remove(id: number): Promise<Course> {
    const course = await this.findOne(id);
    return this.coursesRepository.remove(course);
  }
}
