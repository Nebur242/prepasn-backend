import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { DocumentsRepository } from './repositories/document.repository';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepository: DocumentsRepository) {}

  createEntity(entityLike: DeepPartial<Document>): Document {
    return this.documentsRepository.create(entityLike);
  }

  create(createDocumentDto: CreateDocumentDto) {
    const document = this.documentsRepository.create(createDocumentDto);
    return this.documentsRepository.save(document);
  }

  findAll() {
    return this.documentsRepository.find();
  }

  async findOne(id: number) {
    const document = await this.documentsRepository.findOne(id);
    if (!document)
      throw new NotFoundException(`Document with id ${id} not found`);
    return document;
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.findOne(id);
    await this.documentsRepository.update(document.id, updateDocumentDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.documentsRepository.delete(id);
  }
}
