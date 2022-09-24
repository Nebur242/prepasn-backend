import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { Admin, Authenticated } from '../auth/roles-auth.guard';
import { User } from '../users/entities/user.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ControllerWithApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Admin()
  create(@Claims() user: User, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create({
      ...createCategoryDto,
      createdBy: user,
    });
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit
  ) {
    return this.categoriesService.paginate({
      page,
      limit,
      route: '/categories',
    });
  }

  @Get(':id')
  @Authenticated()
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @Admin()
  update(
    @Claims() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, {
      ...updateCategoryDto,
      updatedBy: user,
    });
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
