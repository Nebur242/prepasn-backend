import { Injectable } from '@nestjs/common';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { Role } from '@prepa-sn/shared/enums';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    initializeApp({
      credential: cert(configService.get('config.firebase')),
    });
  }

  verifyToken(token: string, checkRevoked = false) {
    return getAuth().verifyIdToken(
      token?.replace('Bearer', '')?.trim(),
      checkRevoked
    );
  }

  createUser(email: string, password: string) {
    return getAuth().createUser({ email, password });
  }

  setRoles(uid: string, roles: Role[]) {
    return getAuth().setCustomUserClaims(uid, { roles });
  }

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
