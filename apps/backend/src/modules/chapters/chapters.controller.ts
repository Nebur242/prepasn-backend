import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Admin, Authenticated } from '../auth/roles-auth.guard';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from './entities/chapter.entity';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { FilterDto } from './dto/filter.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { User } from '../users/entities/user.entity';

@ControllerWithApiTags('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  @Admin()
  @ApiOkResponse({ type: Chapter, isArray: false })
  create(
    @Claims() user: User,
    @Body() createChapterDto: CreateChapterDto
  ): Promise<Chapter> {
    return this.chaptersService.create({
      ...createChapterDto,
      createdBy: user,
    });
  }

  @Get()
  @Authenticated()
  @ApiOkResponse({ type: Chapter, isArray: true })
  findAll(
    @Query() filterDto: FilterDto & IPaginationOptions
  ): Promise<Pagination<Chapter>> {
    const { page = 0, limit = 10, ...filter } = filterDto;
    return this.chaptersService.paginate(
      {
        page,
        limit,
        route: '/chapters',
      },
      filter
    );
  }

  @Get(':id')
  @Authenticated()
  @ApiOkResponse({ type: Chapter, isArray: false })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Chapter> {
    return this.chaptersService.findOne(id);
  }

  @Patch(':id')
  @Admin()
  @ApiOkResponse({ type: Chapter, isArray: false })
  update(
    @Claims() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChapterDto: UpdateChapterDto
  ): Promise<Chapter> {
    return this.chaptersService.update(id, {
      ...updateChapterDto,
      updatedBy: user,
    });
  }

  @Delete(':id')
  @Admin()
  @ApiOkResponse({ type: Chapter, isArray: false })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Chapter> {
    return this.chaptersService.remove(id);
  }
}
