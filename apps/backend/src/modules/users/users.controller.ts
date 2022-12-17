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

import { Admin, Authenticated } from '../auth/roles-auth.guard';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterCreateUserTypeDto, FilterDto } from './dto/filterDto.dto';

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

  @Post('/')
  @ApiOkResponse({ type: User })
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Query() filterCreateUserTypeDto: FilterCreateUserTypeDto
  ): Promise<User> {
    return this.usersService.createUser({
      ...createUserDto,
      roles: [filterCreateUserTypeDto.type],
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
  @Authenticated()
  findOne(@Param('uid') uid: string): Promise<User> {
    return this.usersService.findOne(uid);
  }

  @Delete(':uid')
  @Admin()
  remove(@Param('uid') uid: string) {
    return this.usersService.remove(uid);
  }
}
