import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import Controller from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Admin, Authenticated } from '../auth/roles-auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { Classroom } from './entities/classroom.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post()
  @Admin()
  @ApiOkResponse({ type: Classroom, isArray: false })
  create(
    @Claims('uid') uid: string,
    @Body() createClassroomDto: CreateClassroomDto
  ) {
    return this.classroomsService.create({
      ...createClassroomDto,
      createdBy: uid,
      updatedBy: uid,
    });
  }

  @Get()
  @Authenticated()
  @ApiOkResponse({ type: Classroom, isArray: true })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit
  ): Promise<Pagination<Classroom>> {
    return this.classroomsService.paginate({
      page,
      limit,
      route: '/classrooms',
    });
  }

  @Get(':id')
  @Authenticated()
  @ApiOkResponse({ type: Classroom, isArray: false })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Classroom> {
    return this.classroomsService.findOne(id);
  }

  @Patch(':id')
  @Admin()
  @ApiOkResponse({ type: Classroom, isArray: false })
  update(
    @Claims('uid') uid: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClassroomDto: UpdateClassroomDto
  ): Promise<Classroom> {
    return this.classroomsService.update(id, {
      ...updateClassroomDto,
      updatedBy: uid,
    });
  }

  @Delete(':id')
  @Admin()
  @ApiOkResponse({ type: Classroom, isArray: false })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Classroom> {
    return this.classroomsService.remove(id);
  }
}
