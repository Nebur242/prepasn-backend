import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { RolesGuard } from './roles-auth.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase-jwt' })],
  providers: [FirebaseAuthStrategy, RolesGuard],
  exports: [PassportModule],
})
export class AuthModule {}
