import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dtos/students.dto';
import { StudentsRepository } from './repositories/student.repository';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  getAllStudents() {
    return this.studentsRepository.find();
  }

  createStudent(createStudentDto: CreateStudentDto) {
    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }
}
