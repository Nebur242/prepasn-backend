import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoriesRepository } from './repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  createEntity(createCategoryDto: DeepPartial<Category>) {
    return this.categoriesRepository.create(createCategoryDto);
  }

  create(
    createCategoryDto: CreateCategoryDto & {
      createdBy: User | null;
    }
  ): Promise<Category> {
    const category = this.createEntity(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll(filter: FindManyOptions<Category> = {}): Promise<Category[]> {
    return this.categoriesRepository.find({
      ...filter,
      relations: ['courses'],
    });
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
    return paginate<Category>(this.categoriesRepository, options, {
      relations: ['image', 'video', 'createdBy'],
    });
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne(id, {
      relations: [
        'image',
        'video',
        'courses',
        'courses.image',
        'courses.video',
        'courses.grades',
        'courses.documents',
        'courses.categories',
        'courses.createdBy',
      ],
    });
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto & {
      updatedBy: User | null;
    }
  ) {
    const category = await this.findOne(id);
    await this.categoriesRepository.update(category.id, {
      ...updateCategoryDto,
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoriesRepository.remove(category);
  }
}
