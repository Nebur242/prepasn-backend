import { Injectable } from '@nestjs/common';
import { initializeApp, cert } from 'firebase-admin/app';
import { auth } from 'firebase-admin';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { Role } from '@prepa-sn/shared/enums';
import { configService } from '../../common/services/config.service';

@Injectable()
export class FirebaseService {
  constructor(private readonly httpService: HttpService) {
    initializeApp({
      credential: cert(configService.getFirebaseConfig()),
    });
  }

  verifyToken(token: string, checkRevoked = false) {
    return auth().verifyIdToken(
      token?.replace('Bearer', '')?.trim(),
      checkRevoked
    );
  }

  createUser(email: string, password: string) {
    return auth().createUser({ email, password });
  }

  setRoles(uid: string, roles: Role[]) {
    return auth().setCustomUserClaims(uid, { roles });
  }

  login(email: string, password: string) {
    return lastValueFrom(
      this.httpService
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${configService.FIREBASE_REST_API_KEY}`,
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
