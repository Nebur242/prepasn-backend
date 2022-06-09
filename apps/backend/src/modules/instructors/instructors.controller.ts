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
import { Admin, Authenticated } from '../auth/roles-auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { JwtClaims } from '@prepa-sn/backend/common/types/claims.type';

@ControllerWithApiTags('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post('/create')
  @Authenticated()
  @ApiOkResponse({ type: Instructor })
  async createInstructor(
    @Body() createInstructorDto: CreateInstructorDto,
    @Claims() claims: JwtClaims
  ) {
    return this.instructorsService.createInstructor(
      createInstructorDto,
      claims
    );
  }

  @Post()
  @Admin()
  @ApiOkResponse({ type: Instructor })
  async create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorsService.create(createInstructorDto);
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

  @Get(':uid')
  @Admin()
  @ApiOkResponse({ type: Instructor })
  findOne(@Param('uid') uid: string) {
    return this.instructorsService.getOne({
      where: {
        uid,
      },
    });
  }

  @Patch(':uid')
  @Admin()
  @ApiOkResponse({ type: Instructor })
  async update(
    @Param('uid') uid: string,
    @Body() updateInstructorDto: UpdateInstructorDto
  ) {
    const instructor = await this.instructorsService.getOne({
      where: {
        uid,
      },
    });
    return this.instructorsService.update(instructor.id, updateInstructorDto);
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

  @Delete(':uid')
  @Admin()
  @ApiOkResponse({ type: Instructor })
  remove(@Param('uid') id: string) {
    return this.instructorsService.remove(id);
  }
}
