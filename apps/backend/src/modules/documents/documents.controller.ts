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
import { GetClaims } from '@prepa-sn/backend/common/decorators/get-decoded-token';
import { Claims } from '@prepa-sn/backend/common/decorators/get-user.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Authenticated } from '../auth/roles-auth.guard';
import { User } from '../users/entities/user.entity';
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
  @Authenticated()
  create(
    @Claims() user: User,
    @Body() createDocumentDto: CreateDocumentDto
  ): Promise<Document> {
    return this.documentsService.create({
      ...createDocumentDto,
      createdBy: user,
    });
  }

  @Post('bulk')
  @ApiOkResponse({ type: [CreateDocumentDto], isArray: true })
  bulkCreate(
    @Claims() user: User,
    @Body() createDocumentDtos: CreateDocumentDto[]
  ): Promise<Document[]> {
    return this.documentsService.bulkCreate(
      createDocumentDtos.map((dto) => ({
        ...dto,
        createdBy: user,
      }))
    );
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
    @Claims() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto
  ): Promise<Document> {
    return this.documentsService.update(id, {
      ...updateDocumentDto,
      updatedBy: user,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: CreateDocumentDto, isArray: false })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return this.documentsService.remove(id);
  }
}
