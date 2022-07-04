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
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Exercise } from './entities/exercise.entity';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Authenticated } from '../auth/roles-auth.guard';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { FilterDto } from './dto/filter.dto';
import { User } from '../users/entities/user.entity';

@ControllerWithApiTags('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @Authenticated()
  create(
    @Claims() createdBy: User,
    @Body() createExerciseDto: CreateExerciseDto
  ) {
    return this.exercisesService.create({
      ...createExerciseDto,
      createdBy,
    });
  }

  @Get()
  @Authenticated()
  findAll(
    @Query() filterDto: FilterDto & IPaginationOptions
  ): Promise<Pagination<Exercise>> {
    const { page = 0, limit = 10, ...filter } = filterDto;
    return this.exercisesService.paginate(
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
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  @Authenticated()
  update(
    @Claims() updatedBy: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.exercisesService.update(id, {
      ...updateExerciseDto,
      updatedBy,
    });
  }

  @Delete(':id')
  @Authenticated()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.remove(id);
  }
}
