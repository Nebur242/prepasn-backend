import { FirebaseConfig } from '@prepa-sn/shared/interfaces';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { Role } from '@prepa-sn/shared/enums';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private firebaseParams: FirebaseConfig;
  private firebaseApp: firebase.app.App = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.firebaseParams = {
      type: configService.get<string>('FIREBASE_TYPE'),
      projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKeyId: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      privateKey: configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        ?.replace(/\\n/g, '\n'),
      clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      clientId: configService.get<string>('FIREBASE_CLIENT_ID'),
      authUri: configService.get<string>('FIREBASE_AUTH_URI'),
      tokenUri: configService.get<string>('FIREBASE_TOKEN_URI'),
      authProviderX509CertUrl: configService.get<string>(
        'FIREBASE_AUTH_PROVIDER_X509_CERT_URL'
      ),
      clientC509CertUrl: configService.get<string>(
        'FIREBASE_CLIENT_X509_CERT_URL'
      ),
    };
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
    const firebaseRestApiKey = this.configService.get<string>(
      'FIREBASE_REST_API_KEY'
    );
    return lastValueFrom(
      this.httpService
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseRestApiKey}`,
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
