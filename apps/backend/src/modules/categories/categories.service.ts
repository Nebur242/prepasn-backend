import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoriesRepository } from './repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  createEntity(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.create(createCategoryDto);
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.createEntity(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll(filter: FindManyOptions<Category> = {}): Promise<Category[]> {
    return this.categoriesRepository.find(filter);
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
    return paginate<Category>(this.categoriesRepository, options);
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne(id, {
      relations: ['image', 'video'],
    });
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
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
