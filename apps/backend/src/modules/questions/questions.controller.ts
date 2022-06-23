import {
  Controller,
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
import { GetClaims } from '@prepa-sn/backend/common/decorators/get-decoded-token';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Authenticated()
  create(
    @Claims('uid') uid: string,
    @Body() createQuestionDto: CreateQuestionDto
  ) {
    return this.questionsService.create({
      ...createQuestionDto,
      createdBy: uid,
      updatedBy: uid,
    });
  }

  @Get()
  @Authenticated()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit
  ) {
    return this.questionsService.paginate({
      page,
      limit,
      route: '/questions',
    });
  }

  @Get(':id')
  @Authenticated()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @Authenticated()
  update(
    @Claims('uid') uid: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionsService.update(id, {
      ...updateQuestionDto,
      updatedBy: uid,
    });
  }

  @Delete(':id')
  @Authenticated()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.remove(id);
  }
}
