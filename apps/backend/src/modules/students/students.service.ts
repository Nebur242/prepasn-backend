import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prepa-sn/shared/enums';
import { JwtClaims } from '../../common/types/claims.type';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateStudentDto, UpdateStudentDto } from './dtos/students.dto';
import { Student } from './entities/student.entity';
import { StudentsRepository } from './repositories/student.repository';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly firebaseService: FirebaseService
  ) {}

  getAllStudents(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  async createStudent(
    createStudentDto: CreateStudentDto,
    claims: JwtClaims
  ): Promise<Student> {
    await this.firebaseService.setRoles(claims.uid, [Role.STUDENT]);
    const student = this.studentsRepository.create({
      ...createStudentDto,
      uid: claims.uid,
      email: createStudentDto.email || claims.email,
      phone: createStudentDto.phone || claims.phone_number,
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
