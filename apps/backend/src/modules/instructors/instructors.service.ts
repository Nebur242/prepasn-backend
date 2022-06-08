import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserStatusDto } from '@prepa-sn/backend/common/dtos/update-user-status.dto';
import { JwtClaims } from '@prepa-sn/backend/common/types/claims.type';
import { Role } from '@prepa-sn/shared/enums';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Instructor } from './entities/instructor.entity';
import { InstructorsRepository } from './repositories/instructor.repository';

@Injectable()
export class InstructorsService {
  constructor(
    private readonly instructorsRepository: InstructorsRepository,
    private readonly firebaseService: FirebaseService
  ) {}

  async createInstructor(
    createInstructorDto: CreateInstructorDto,
    claims: JwtClaims
  ): Promise<Instructor> {
    await this.firebaseService.setRoles(claims.uid, [Role.INSTRUCTOR]);
    const student = this.instructorsRepository.create({
      ...createInstructorDto,
      uid: claims.uid,
      email: createInstructorDto.email || claims.email,
      phone: createInstructorDto.phone || claims.phone_number,
    });
    return this.instructorsRepository.save(student);
  }

  async create(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
    const createdUser = await this.firebaseService.createUser(
      createInstructorDto.email,
      createInstructorDto.password
    );
    await this.firebaseService.setRoles(createdUser.uid, [Role.INSTRUCTOR]);
    const instructor = this.instructorsRepository.create({
      ...createInstructorDto,
      uid: createdUser.uid,
    });
    return this.instructorsRepository.save(instructor);
  }

  findAll(filter: FindManyOptions<Instructor> = {}): Promise<Instructor[]> {
    return this.instructorsRepository.find(filter);
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Instructor>> {
    return paginate<Instructor>(this.instructorsRepository, options);
  }

  async findOne(id: number): Promise<Instructor> {
    const instructor = await this.instructorsRepository.findOne(id);
    if (!instructor)
      throw new NotFoundException(`Instructor with id ${id} not found`);
    return instructor;
  }

  async getOne(filter: FindManyOptions<Instructor> = {}): Promise<Instructor> {
    const instructor = await this.instructorsRepository.findOne(filter);
    if (!instructor)
      throw new NotFoundException(`Instructor with this filter not found`);
    return instructor;
  }

  async update(
    id: number,
    updateInstructorDto: UpdateInstructorDto
  ): Promise<Instructor> {
    const instructor = await this.findOne(id);
    await this.instructorsRepository.update(instructor.id, updateInstructorDto);
    return this.findOne(id);
  }

  async updateStatus(
    id: number,
    updateUserStatusDto: UpdateUserStatusDto
  ): Promise<Instructor> {
    const instructor = await this.findOne(id);
    await this.instructorsRepository.update(instructor.id, updateUserStatusDto);
    return this.findOne(id);
  }

  async remove(uid: string): Promise<Instructor> {
    const instructor = await this.getOne({
      where: { uid },
    });
    await this.firebaseService.removeUser(instructor.uid);
    await this.instructorsRepository.remove(instructor);
    return instructor;
  }
}
