import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prepa-sn/shared/enums';
import { JwtClaims } from '@prepa-sn/backend/common/types/claims.type';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateStudentDto, UpdateStudentDto } from './dtos/students.dto';
import { Student } from './entities/student.entity';
import { StudentsRepository } from './repositories/student.repository';
import { FindManyOptions } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly firebaseService: FirebaseService
  ) {}

  getAllStudents(filter: FindManyOptions<Student> = {}): Promise<Student[]> {
    return this.studentsRepository.find(filter);
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Student>> {
    return paginate<Student>(this.studentsRepository, options);
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

  create(createStudentDto: CreateStudentDto) {
    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }

  async update(
    uid: string,
    updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    const student = await this.findOne(uid);
    await this.studentsRepository.save({
      ...student,
      ...updateStudentDto,
    });
    return this.findOne(uid);
  }

  async findOne(uid: string): Promise<Student> {
    const student: Student = await this.studentsRepository.findOne({ uid });
    if (!student)
      throw new NotFoundException(`Student with uid ${uid} not found`);
    return student;
  }

  async getOne(filter: FindManyOptions<Student> = {}): Promise<Student> {
    const student = await this.studentsRepository.findOne(filter);
    if (!Student)
      throw new NotFoundException(`Student with this filter not found`);
    return student;
  }

  async remove(uid: string): Promise<Student> {
    const student = await this.getOne({
      where: { uid },
    });
    await this.firebaseService.removeUser(student.uid);
    await this.studentsRepository.remove(student);
    return student;
  }
}
