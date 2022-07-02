import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Authenticated } from '../auth/roles-auth.guard';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { FilterDto } from './dto/filter.dto';
import ControllerWithApiTags from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { User } from '../users/entities/user.entity';

@ControllerWithApiTags('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Authenticated()
  create(
    @Claims() createdBy: User,
    @Body() createQuestionDto: CreateQuestionDto
  ) {
    return this.questionsService.create({
      ...createQuestionDto,
      createdBy,
    });
  }

  @Get()
  @Authenticated()
  findAll(@Query() filterDto: FilterDto & IPaginationOptions) {
    const { page = 0, limit = 10, ...filter } = filterDto;
    return this.questionsService.paginate(
      {
        page,
        limit,
        route: '/questions',
      },
      filter
    );
  }

  @Get(':id')
  @Authenticated()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @Authenticated()
  update(
    @Claims() updatedBy: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionsService.update(id, {
      ...updateQuestionDto,
      updatedBy,
    });
  }

  @Delete(':id')
  @Authenticated()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.remove(id);
  }
}
