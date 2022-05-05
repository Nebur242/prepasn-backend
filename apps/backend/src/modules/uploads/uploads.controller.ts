import {
  Controller,
  Post,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

function getDatePath(date: Date): string {
  return (
    date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  );
}

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads/' + getDatePath(new Date()),
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  create(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.uploadsService.create(files);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.uploadsService.remove(id);
  }
}
