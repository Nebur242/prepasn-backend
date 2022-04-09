import { FirebaseConfig } from '@prepa-sn/shared/interfaces';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { Role } from '@prepa-sn/shared/enums';
import { configService } from '../../common/services/config.service';

@Injectable()
export class FirebaseService {
  private firebaseParams: FirebaseConfig;
  private firebaseApp: firebase.app.App = null;

  constructor(private readonly httpService: HttpService) {
    this.firebaseParams = configService.getFirebaseConfig();
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(this.firebaseParams),
    });
  }

  verifyToken(token: string, checkRevoked = false) {
    return this.firebaseApp
      .auth()
      .verifyIdToken(token?.replace('Bearer', '')?.trim(), checkRevoked);
  }

  createUser(email: string, password: string) {
    return this.firebaseApp.auth().createUser({ email, password });
  }

  setRoles(uid: string, roles: Role[]) {
    return this.firebaseApp.auth().setCustomUserClaims(uid, { roles });
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
