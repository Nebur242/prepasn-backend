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
import { Pagination } from 'nestjs-typeorm-paginate';
import { Exercise } from './entities/exercise.entity';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Authenticated } from '../auth/roles-auth.guard';
import { GetClaims } from '@prepa-sn/backend/common/decorators/get-decoded-token';

@ControllerWithApiTags('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @Authenticated()
  create(
    @GetClaims('uid') uid: string,
    @Body() createExerciseDto: CreateExerciseDto
  ) {
    return this.exercisesService.create({
      ...createExerciseDto,
      createdBy: uid,
      updatedBy: uid,
    });
  }

  @Get()
  @Authenticated()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit
  ): Promise<Pagination<Exercise>> {
    return this.exercisesService.paginate({
      page,
      limit,
      route: '/exercises',
    });
  }

  @Get(':id')
  @Authenticated()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  @Authenticated()
  update(
    @GetClaims('uid') uid: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.exercisesService.update(id, {
      ...updateExerciseDto,
      updatedBy: uid,
    });
  }

  @Delete(':id')
  @Authenticated()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.remove(id);
  }
}
