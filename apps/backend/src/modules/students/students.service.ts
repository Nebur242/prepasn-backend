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

  createStudent(
    createStudentDto: CreateStudentDto,
    uid: string
  ): Promise<Student> {
    const student = this.studentsRepository.create({
      ...createStudentDto,
      uid,
    });
    return this.studentsRepository.save(student);
  }

  async update(
    uid: string,
    updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    const student = await this.findOne(uid);
    await this.studentsRepository.update(student.id, updateStudentDto);
    return this.findOne(uid);
  }

  async findOne(uid: string): Promise<Student> {
    const student: Student = await this.studentsRepository.findOne({ uid });
    if (!student)
      throw new NotFoundException(`Student with uid ${uid} not found`);
    return student;
  }
}
