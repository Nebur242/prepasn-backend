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
import { InstructorsService } from './instructors.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Instructor } from './entities/instructor.entity';
import { UpdateUserStatusDto } from '@prepa-sn/backend/common/dtos/update-user-status.dto';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Admin } from '../auth/roles-auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { FirebaseService } from '../firebase/firebase.service';
import { Role } from '@prepa-sn/shared/enums';

@ControllerWithApiTags('instructors')
export class InstructorsController {
  constructor(
    private readonly instructorsService: InstructorsService,
    private readonly firebaseService: FirebaseService
  ) {}

  @Post()
  @Admin()
  @ApiOkResponse({ type: Instructor })
  async create(@Body() createInstructorDto: CreateInstructorDto) {
    const createdUser = await this.firebaseService.createUser(
      createInstructorDto.email,
      createInstructorDto.password
    );
    await this.firebaseService.setRoles(createdUser.uid, [Role.INSTRUCTOR]);
    return this.instructorsService.create({
      ...createInstructorDto,
      uid: createdUser.uid,
    });
  }

  @Get()
  @Admin()
  @ApiOkResponse({ type: Instructor, isArray: true })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit
  ): Promise<Pagination<Instructor>> {
    return this.instructorsService.paginate({
      page,
      limit,
      route: '/instructors',
    });
  }

  @Get(':id')
  @Admin()
  @ApiOkResponse({ type: Instructor })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.instructorsService.findOne(id);
  }

  @Patch(':id')
  @Admin()
  @ApiOkResponse({ type: Instructor })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInstructorDto: UpdateInstructorDto
  ) {
    return this.instructorsService.update(id, updateInstructorDto);
  }

  @Patch(':id/status')
  @Admin()
  @ApiOkResponse({ type: Instructor })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserStatusDto: UpdateUserStatusDto
  ) {
    return this.instructorsService.updateStatus(id, updateUserStatusDto);
  }

  @Delete(':id')
  @Admin()
  @ApiOkResponse({ type: Instructor })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.instructorsService.remove(id);
  }
}
