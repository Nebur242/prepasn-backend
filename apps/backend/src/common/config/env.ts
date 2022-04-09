import { registerAs } from '@nestjs/config';
import firebaseConfig from './firebase.config';
import typeOrmConfig from './typeorm.config';

export const env = registerAs('config', () => ({
  firebase: firebaseConfig,
  typeorm: typeOrmConfig,
}));
