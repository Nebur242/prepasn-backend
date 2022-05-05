import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { unlink } from 'fs/promises';
export interface IUploadFile extends Express.Multer.File {
  publicUrl: string;
}

@Injectable()
export class UploadsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(files: Array<Express.Multer.File>): Promise<Array<IUploadFile>> {
    const uploads = await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const publicUrl = await this.firebaseService.uploadFile(file);
        return {
          ...file,
          publicUrl,
        };
      })
    );
    try {
      await Promise.all(
        files.map(async (file: Express.Multer.File) => {
          return unlink(file.path);
        })
      );
    } catch (error) {
      console.log(error);
    }
    return uploads;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
