import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prepa-sn/shared/enums';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/student.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly firebaseService: FirebaseService
  ) {}

  async create(
    createUserDto: CreateUserDto & {
      roles: Role[];
    }
  ) {
    const createdUser = await this.firebaseService.createUser(
      createUserDto.email,
      createUserDto.password
    );
    await this.firebaseService.setRoles(createdUser.uid, createUserDto.roles);

    const user = this.usersRepository.create({
      ...createUserDto,
      uid: createdUser.uid,
      roles: createUserDto.roles,
    });
    return this.usersRepository.save(user);
  }

  paginate(
    options: IPaginationOptions,
    filter: FindManyOptions<User> = {}
  ): Promise<Pagination<User>> {
    return paginate<User>(this.usersRepository, options, filter);
  }

  async findOne(uid: string): Promise<User> {
    const user: User = await this.usersRepository.findOne(
      { uid },
      {
        relations: ['profile'],
      }
    );
    if (!user) throw new NotFoundException(`Student with uid ${uid} not found`);
    return user;
  }

  async getOne(filter: FindManyOptions<User> = {}): Promise<User> {
    const user = await this.usersRepository.findOne(filter);
    if (!user)
      throw new NotFoundException(`Student with this filter not found`);
    return user;
  }

  async update(uid: string, updateStudentDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(uid);
    await this.usersRepository.save({
      ...user,
      ...updateStudentDto,
    });
    return this.findOne(uid);
  }

  async remove(uid: string): Promise<User> {
    const user = await this.getOne({
      where: { uid },
    });
    await this.firebaseService.removeUser(user.uid);
    await this.usersRepository.remove(user);
    return user;
  }
}
