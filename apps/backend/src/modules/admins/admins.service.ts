import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { AdminsRepository } from './repositories/admin.repository';

@Injectable()
export class AdminsService {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  create(createAdminDto: CreateAdminDto) {
    const admin = this.adminsRepository.create(createAdminDto);
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

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    await this.adminsRepository.update(admin.id, updateAdminDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await this.adminsRepository.remove(admin);
    return admin;
  }
}
