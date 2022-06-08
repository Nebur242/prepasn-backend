import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prepa-sn/shared/enums';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { AdminsRepository } from './repositories/admin.repository';

@Injectable()
export class AdminsService {
  constructor(
    private readonly adminsRepository: AdminsRepository,
    private readonly firebaseService: FirebaseService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const createdUser = await this.firebaseService.createUser(
      createAdminDto.email,
      createAdminDto.password
    );
    await this.firebaseService.setRoles(createdUser.uid, [Role.ADMIN]);
    const admin = this.adminsRepository.create({
      ...createAdminDto,
      uid: createdUser.uid,
    });
    return this.adminsRepository.save(admin);
  }

  findAll(filter: FindManyOptions<Admin> = {}) {
    return this.adminsRepository.find(filter);
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Admin>> {
    return paginate<Admin>(this.adminsRepository, options);
  }

  async findOne(id: number) {
    const admin = await this.adminsRepository.findOne(id);
    if (!admin) throw new NotFoundException(`Admin with id ${id} not found`);
    return admin;
  }

  async getOne(filter: FindManyOptions<Admin> = {}): Promise<Admin> {
    const admin = await this.adminsRepository.findOne(filter);
    if (!admin) throw new NotFoundException(`Admin with this filter not found`);
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    await this.adminsRepository.update(admin.id, updateAdminDto);
    return this.findOne(id);
  }

  async remove(uid: string) {
    const admin = await this.getOne({
      where: {
        uid,
      },
    });
    await this.firebaseService.removeUser(admin.uid);
    await this.adminsRepository.remove(admin);
    return admin;
  }
}
