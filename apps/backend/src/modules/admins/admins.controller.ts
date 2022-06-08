import {
  Controller,
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
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prepa-sn/shared/enums';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Admin } from '../auth/roles-auth.guard';
import { FirebaseService } from '../firebase/firebase.service';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin as AdminEntity } from './entities/admin.entity';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly firebaseService: FirebaseService
  ) {}

  @Post()
  @Admin()
  @ApiOkResponse({ type: AdminEntity })
  async create(@Body() createAdminDto: CreateAdminDto) {
    const createdUser = await this.firebaseService.createUser(
      createAdminDto.email,
      createAdminDto.password
    );
    await this.firebaseService.setRoles(createdUser.uid, [Role.ADMIN]);
    return this.adminsService.create({
      ...createAdminDto,
      uid: createdUser.uid,
    });
  }

  @Get()
  @Admin()
  @ApiOkResponse({ type: AdminEntity, isArray: true })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit
  ): Promise<Pagination<AdminEntity>> {
    return this.adminsService.paginate({
      page,
      limit,
      route: '/admins',
    });
  }

  @Get(':id')
  @Admin()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.findOne(id);
  }

  @Patch(':id')
  @Admin()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.remove(id);
  }
}
