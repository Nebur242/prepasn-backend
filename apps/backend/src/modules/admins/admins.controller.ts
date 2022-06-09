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
import { ApiOkResponse } from '@nestjs/swagger';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Admin } from '../auth/roles-auth.guard';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin as AdminEntity } from './entities/admin.entity';

@ControllerWithApiTags('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @Admin()
  @ApiOkResponse({ type: AdminEntity })
  async create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
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

  @Get(':uid')
  @Admin()
  findOne(@Param('uid') uid: string) {
    return this.adminsService.getOne({
      where: { uid },
    });
  }

  @Patch(':uid')
  @Admin()
  async update(
    @Param('uid') uid: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    const admin = await this.adminsService.getOne({
      where: { uid },
    });
    return this.adminsService.update(admin.id, updateAdminDto);
  }

  @Delete(':uid')
  @Admin()
  remove(@Param('uid') uid: string) {
    return this.adminsService.remove(uid);
  }
}
