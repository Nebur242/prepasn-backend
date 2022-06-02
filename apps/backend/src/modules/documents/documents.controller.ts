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
import { ApiOkResponse } from '@nestjs/swagger';
import Controller from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Authenticated } from '../auth/roles-auth.guard';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Controller('documents')
@Authenticated()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOkResponse({ type: CreateDocumentDto, isArray: false })
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentsService.create(createDocumentDto);
  }

  @Post('bulk')
  @ApiOkResponse({ type: [CreateDocumentDto], isArray: true })
  bulkCreate(
    @Body() createDocumentDtos: CreateDocumentDto[]
  ): Promise<Document[]> {
    return this.documentsService.bulkCreate(createDocumentDtos);
  }

  @Get()
  @ApiOkResponse({ type: CreateDocumentDto, isArray: true })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit
  ): Promise<Pagination<Document>> {
    return this.documentsService.paginate({
      page,
      limit,
      route: '/documents',
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: CreateDocumentDto, isArray: false })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CreateDocumentDto, isArray: false })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto
  ): Promise<Document> {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CreateDocumentDto, isArray: false })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return this.documentsService.remove(id);
  }
}
