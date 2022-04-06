import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as firebase from 'firebase-admin';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { ConfigService } from '@nestjs/config';
import { FirebaseConfig } from '@prepa-sn/shared/interfaces';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('FirebaseAuthStrategy');
  private firebaseParams: FirebaseConfig;
  private firebaseApp = null;

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.firebaseParams = {
      type: this.configService.get('FIREBASE_TYPE'),
      projectId: this.configService.get('FIREBASE_PROJECT_ID'),
      privateKeyId: this.configService.get('FIREBASE_PRIVATE_KEY_ID'),
      privateKey: this.configService.get('FIREBASE_PRIVATE_KEY'),
      clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
      clientId: this.configService.get('FIREBASE_CLIENT_ID'),
      authUri: this.configService.get('FIREBASE_AUTH_URI'),
      tokenUri: this.configService.get('FIREBASE_TOKEN_URI'),
      authProviderX509CertUrl: this.configService.get(
        'FIREBASE_AUTH_PROVIDER_X509_CERT_URL'
      ),
      clientC509CertUrl: this.configService.get(
        'FIREBASE_CLIENT_X509_CERT_URL'
      ),
    };
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(this.firebaseParams),
    });
  }

  async validate(token: string) {
    try {
      const user = await this.firebaseApp.auth().verifyIdToken(token, true);
      if (!user) throw new UnauthorizedException("User doesn't exist");
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
