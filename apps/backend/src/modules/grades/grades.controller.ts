import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Admin, Authenticated } from '../auth/roles-auth.guard';
import { Grade } from './entities/grade.entity';
import Controller from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @Admin()
  @ApiOkResponse({ type: Grade, isArray: false })
  create(
    @Claims() createdBy: User,
    @Body() createGradeDto: CreateGradeDto
  ): Promise<Grade> {
    return this.gradesService.create({
      ...createGradeDto,
      createdBy,
    });
  }

  @Get()
  @Authenticated()
  @ApiOkResponse({ type: Grade, isArray: true })
  findAll(): Promise<Grade[]> {
    return this.gradesService.findAll();
  }

  @Get(':id')
  @Authenticated()
  @ApiOkResponse({ type: Grade, isArray: false })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Grade> {
    return this.gradesService.findOne(id);
  }

  @Patch(':id')
  @Admin()
  @ApiOkResponse({ type: Grade, isArray: false })
  update(
    @Claims() updatedBy: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGradeDto: UpdateGradeDto
  ): Promise<Grade> {
    return this.gradesService.update(id, {
      ...updateGradeDto,
      updatedBy,
    });
  }

  @Delete(':id')
  @Admin()
  @ApiOkResponse({ type: Grade, isArray: false })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Grade> {
    return this.gradesService.remove(id);
  }
}
