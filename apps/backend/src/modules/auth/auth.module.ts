import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from '../firebase/firebase.module';
import { UsersModule } from '../users/users.module';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { RolesGuard } from './roles-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
    FirebaseModule,
    UsersModule,
  ],
  providers: [FirebaseAuthStrategy, RolesGuard],
  exports: [PassportModule, RolesGuard, UsersModule, FirebaseModule],
})
export class AuthModule {}
