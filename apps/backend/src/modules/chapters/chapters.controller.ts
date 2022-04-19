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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prepa-sn/shared/enums';
import { Authenticated, Roles } from '../auth/roles-auth.guard';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from './entities/chapter.entity';

@ApiTags('Chapters')
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: Chapter, isArray: false })
  create(@Body() createChapterDto: CreateChapterDto): Promise<Chapter> {
    return this.chaptersService.create(createChapterDto);
  }

  @Get()
  @Authenticated()
  @ApiOkResponse({ type: Chapter, isArray: true })
  findAll(): Promise<Chapter[]> {
    return this.chaptersService.findAll();
  }

  @Get(':id')
  @Authenticated()
  @ApiOkResponse({ type: Chapter, isArray: false })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Chapter> {
    return this.chaptersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: Chapter, isArray: false })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChapterDto: UpdateChapterDto
  ): Promise<Chapter> {
    return this.chaptersService.update(id, updateChapterDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: Chapter, isArray: false })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Chapter> {
    return this.chaptersService.remove(id);
  }
}
