import { Injectable, PipeTransform } from '@nestjs/common';
import { FirebaseService } from '../../modules/firebase/firebase.service';

@Injectable()
export class DecodeTokenPipe implements PipeTransform {
  constructor(private readonly firebaseService: FirebaseService) {}

  async transform(value: string) {
    return this.firebaseService.verifyToken(value, false);
  }
}
