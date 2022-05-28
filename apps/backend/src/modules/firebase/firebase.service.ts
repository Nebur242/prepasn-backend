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
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(configService.get('config.firebase')),
      });
    }
  }

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

  @CatchFirebaseException()
  getUsers(maxResults?: number, pageToken?: string) {
    return getAuth().listUsers(maxResults, pageToken);
  }

  @CatchFirebaseException()
  async getStudents(maxResults?: number, pageToken?: string) {
    const users = await getAuth().listUsers(maxResults, pageToken);
    return users.users.filter((user) =>
      user.customClaims?.roles?.includes(Role.STUDENT)
    );
  }
}
