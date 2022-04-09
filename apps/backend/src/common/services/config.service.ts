import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FirebaseConfig } from '@prepa-sn/shared/interfaces';
import { Student } from '../../modules/students/entities/student.entity';

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = false): string {
    const value = this.env[key];
    if (value == null && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getValue('DB_TYPE') as 'postgres',
      host: this.getValue('DB_HOST'),
      port: +this.getValue('DB_PORT'),
      database: this.getValue('DB_NAME'),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      ssl: this.getValue('DB_SSL')?.toLowerCase() === 'true',
      logging: this.getValue('DB_LOGGING')?.toLowerCase() === 'true',
      synchronize: this.getValue('DB_SYNC')?.toLowerCase() === 'true',
      entities: [Student],
    };
  }

  get FIREBASE_REST_API_KEY() {
    return this.getValue('FIREBASE_REST_API_KEY');
  }

  public getFirebaseConfig(): FirebaseConfig {
    return {
      type: this.getValue('FIREBASE_TYPE'),
      projectId: this.getValue('FIREBASE_PROJECT_ID'),
      privateKeyId: this.getValue('FIREBASE_PRIVATE_KEY_ID'),
      privateKey: this.getValue('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      clientEmail: this.getValue('FIREBASE_CLIENT_EMAIL'),
      clientId: this.getValue('FIREBASE_CLIENT_ID'),
      authUri: this.getValue('FIREBASE_AUTH_URI'),
      tokenUri: this.getValue('FIREBASE_TOKEN_URI'),
      authProviderX509CertUrl: this.getValue(
        'FIREBASE_AUTH_PROVIDER_X509_CERT_URL'
      ),
      clientC509CertUrl: this.getValue('FIREBASE_CLIENT_X509_CERT_URL'),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_TYPE',
  'DB_NAME',
  'FIREBASE_TYPE',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_PRIVATE_KEY_ID',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_CLIENT_ID',
  'FIREBASE_AUTH_URI',
  'FIREBASE_TOKEN_URI',
  'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
  'FIREBASE_CLIENT_X509_CERT_URL',
  'FIREBASE_REST_API_KEY',
]);

export { configService };
