import { FirebaseConfig } from '@prepa-sn/shared/interfaces';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { Role } from '@prepa-sn/shared/enums';

@Injectable()
export class FirebaseService {
  private firebaseParams: FirebaseConfig;
  private firebaseApp: firebase.app.App = null;

  constructor(private readonly httpService: HttpService) {
    this.firebaseParams = {
      type: process.env.FIREBASE_TYPE,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: process.env.FIREBASE_AUTH_URI,
      tokenUri: process.env.FIREBASE_TOKEN_URI,
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(this.firebaseParams),
    });
  }

  verifyToken(token: string, checkRevoked = false) {
    return this.firebaseApp.auth().verifyIdToken(token?.replace('Bearer', '')?.trim(), checkRevoked);
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
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_REST_API_KEY}`,
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
