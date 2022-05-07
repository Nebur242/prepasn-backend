import { Injectable } from '@nestjs/common';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { Role } from '@prepa-sn/shared/enums';
import { ConfigService } from '@nestjs/config';
import { CatchFirebaseException } from './decorators/firebase-exception.decorator';

@Injectable()
export class FirebaseService {
  private readonly firebaseApp = null;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    if (getApps().length === 0) {
      this.firebaseApp = initializeApp({
        credential: cert(configService.get('config.firebase')),
        storageBucket: configService.get('config.firebase.storageBucket'),
      });
    }
  }

  // async uploadFile(file: Express.Multer.File) {
  //   const storage = getStorage();
  //   const bucket = storage.bucket();
  //   const uploaded = await bucket.upload(`./${file.path}`, {
  //     destination: `${file.path}`,
  //     public: true,
  //   });
  //   return uploaded[0].metadata.mediaLink;
  // }

  @CatchFirebaseException()
  verifyToken(token: string, checkRevoked = false) {
    return getAuth().verifyIdToken(
      token?.replace('Bearer', '')?.trim(),
      checkRevoked
    );
  }

  @CatchFirebaseException()
  createUser(email: string, password: string) {
    return getAuth().createUser({ email, password });
  }

  @CatchFirebaseException()
  setRoles(uid: string, roles: Role[]) {
    return getAuth().setCustomUserClaims(uid, { roles });
  }

  @CatchFirebaseException()
  login(email: string, password: string) {
    return lastValueFrom(
      this.httpService
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.configService.get(
            'config.firebase.firebaseRestApiKey'
          )}`,
          {
            email,
            password,
            returnSecureToken: true,
          }
        )
        .pipe(map((response) => response.data))
    );
  }
}
