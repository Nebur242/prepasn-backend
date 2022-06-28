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
import Controller from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { FilterDto } from './dto/filter.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  @Admin()
  @ApiOkResponse({ type: Chapter, isArray: false })
  create(
    @Claims('uid') uid: string,
    @Body() createChapterDto: CreateChapterDto
  ): Promise<Chapter> {
    return this.chaptersService.create({
      ...createChapterDto,
      createdBy: uid,
      updatedBy: uid,
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
    @Claims('uid') uid: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChapterDto: UpdateChapterDto
  ): Promise<Chapter> {
    return this.chaptersService.update(id, {
      ...updateChapterDto,
      updatedBy: uid,
    });
  }

  @Delete(':id')
  @Admin()
  @ApiOkResponse({ type: Chapter, isArray: false })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Chapter> {
    return this.chaptersService.remove(id);
  }
}
