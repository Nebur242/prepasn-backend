import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse } from '@nestjs/swagger';
import Controller from '@prepa-sn/backend/common/decorators/controller-with-apiTags.decorator';
import { Authenticated } from '../auth/roles-auth.guard';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { diskStorage } from 'multer';

function getDatePath(date: Date): string {
  return (
    date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  );
}
@Controller('documents')
@Authenticated()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOkResponse({ type: CreateDocumentDto, isArray: false })
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentsService.create(createDocumentDto);
  }

  @Post('/uploads')
  @UseInterceptors(
    FilesInterceptor('documents', 20, {
      storage: diskStorage({
        destination: './uploads/' + getDatePath(new Date()),
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  createWithUploads(
    @UploadedFiles() documents: Array<Express.Multer.File>
  ): Promise<Document[]> {
    return this.documentsService.createWithUploads(documents);
  }

  @Get()
  @ApiOkResponse({ type: CreateDocumentDto, isArray: true })
  findAll(): Promise<Document[]> {
    return this.documentsService.findAll();
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
