import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prepa-sn/shared/enums';
import { Authenticated, Roles } from '../auth/roles-auth.guard';
import { CoursesService } from './courses.service';
import { CourseDto } from './dto/course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: CourseDto, isArray: false })
  @ApiBody({ type: CreateCourseDto })
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @Authenticated()
  @ApiOkResponse({ type: CourseDto, isArray: true })
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @Authenticated()
  @ApiOkResponse({ type: CourseDto, isArray: false })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: CourseDto, isArray: false })
  @ApiBody({ type: CreateCourseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto
  ): Promise<Course> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: Course, isArray: false })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Course> {
    return this.coursesService.remove(id);
  }
}
