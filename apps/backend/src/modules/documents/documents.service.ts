import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { DocumentsRepository } from './repositories/document.repository';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepository: DocumentsRepository) {}

  createEntity(entityLike: DeepPartial<Document>): Document {
    return this.documentsRepository.create(entityLike);
  }

  create(
    createDocumentDto: CreateDocumentDto & {
      createdBy: User;
    }
  ): Promise<Document> {
    const document = this.documentsRepository.create(createDocumentDto);
    return this.documentsRepository.save(document);
  }

  async bulkCreate(
    documents: (CreateDocumentDto & {
      createdBy: User;
    })[]
  ): Promise<Document[]> {
    return Promise.all(
      documents.map(async (document) => {
        return this.create(document);
      })
    );
  }

  findAll(): Promise<Document[]> {
    return this.documentsRepository.find();
  }

  async findOne(id: number): Promise<Document> {
    const document = await this.documentsRepository.findOne(id);
    if (!document)
      throw new NotFoundException(`Document with id ${id} not found`);
    return document;
  }

  async update(
    id: number,
    updateDocumentDto: UpdateDocumentDto & {
      updatedBy: User;
    }
  ): Promise<Document> {
    const document = await this.findOne(id);
    await this.documentsRepository.update(document.id, updateDocumentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Document> {
    const document = await this.findOne(id);
    await this.documentsRepository.delete(document.id);
    return document;
  }

  paginate(options: IPaginationOptions): Promise<Pagination<Document>> {
    return paginate<Document>(this.documentsRepository, options);
  }
}
