import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateExerciseDto } from './dto/update-section.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Section } from './entities/section.entity';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Authenticated } from '../auth/roles-auth.guard';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { FilterDto } from './dto/filter.dto';
import { User } from '../users/entities/user.entity';

@ControllerWithApiTags('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @Authenticated()
  create(
    @Claims() createdBy: User,
    @Body() createExerciseDto: CreateSectionDto
  ) {
    return this.sectionsService.create({
      ...createExerciseDto,
      createdBy,
    });
  }

  @Get()
  @Authenticated()
  findAll(
    @Query() filterDto: FilterDto & IPaginationOptions
  ): Promise<Pagination<Section>> {
    const { page = 0, limit = 10, ...filter } = filterDto;
    return this.sectionsService.paginate(
      {
        page,
        limit,
        route: '/exercises',
      },
      filter
    );
  }

  @Get(':id')
  @Authenticated()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectionsService.findOne(id);
  }

  @Patch(':id')
  @Authenticated()
  update(
    @Claims() updatedBy: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.sectionsService.update(id, {
      ...updateExerciseDto,
      updatedBy,
    });
  }

  @Delete(':id')
  @Authenticated()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sectionsService.remove(id);
  }
}
