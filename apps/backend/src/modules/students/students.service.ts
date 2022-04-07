import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dtos/students.dto';
import { Student } from './entities/student.entity';
import { StudentsRepository } from './repositories/student.repository';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  getAllStudents(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    const student = await this.findOne(id);
    await this.studentsRepository.update(student.id, updateStudentDto);
    return this.findOne(id);
  }

  async findOne(id: number): Promise<Student> {
    const student: Student = await this.studentsRepository.findOne(id);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }
}
