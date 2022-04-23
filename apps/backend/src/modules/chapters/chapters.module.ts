import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { CoursesModule } from '../courses/courses.module';
import { ChaptersRepository } from './repositories/chapter.repository';
import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [CoursesModule, DocumentsModule],
  controllers: [ChaptersController],
  providers: [ChaptersService, ChaptersRepository],
  exports: [ChaptersService],
})
export class ChaptersModule {}
