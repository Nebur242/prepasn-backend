import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { Role } from '@prepa-sn/shared/enums';
import { Admin, Authenticated } from '../auth/roles-auth.guard';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterDto } from './dto/filterDto.dto';

@ControllerWithApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: User, isArray: true })
  @Admin()
  findAll(
    @Query(new ValidationPipe({ transform: true })) filter: FilterDto
  ): Promise<Pagination<User>> {
    const { page = 1, limit = 10, ...search } = filter;
    return this.usersService.paginate(
      {
        page,
        limit,
        route: '/users',
      },
      {
        where: {
          ...search,
        },
      }
    );
  }

  @Post('/admins')
  // @Admin()
  @ApiOkResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create({
      ...createUserDto,
      roles: [Role.ADMIN],
    });
  }

  @Post('/instructors')
  @Admin()
  @ApiOkResponse({ type: User })
  async createInstructor(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create({
      ...createUserDto,
      roles: [Role.INSTRUCTOR],
    });
  }

  @Post('/students')
  // @Admin()
  @ApiOkResponse({ type: User })
  async createStudent(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create({
      ...createUserDto,
      roles: [Role.STUDENT],
    });
  }

  @Patch(':uid')
  @ApiOkResponse({ type: User })
  @Authenticated()
  updateStudent(
    @Param('uid') uid: string,
    @Body() updateStudentDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(uid, updateStudentDto);
  }

  @Get(':uid')
  @ApiOkResponse({ type: User })
  // @Roles(Role.STUDENT, Role.ADMIN)
  findOne(@Param('uid') uid: string): Promise<User> {
    return this.usersService.findOne(uid);
  }

  @Delete(':uid')
  // @Admin()
  remove(@Param('uid') uid: string) {
    return this.usersService.remove(uid);
  }
}
