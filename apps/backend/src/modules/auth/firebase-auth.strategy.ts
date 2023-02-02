import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseService } from '../firebase/firebase.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('FirebaseAuthStrategy');

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const firebaseUser = await this.firebaseService.verifyToken(token);
      if (!firebaseUser) throw new UnauthorizedException("User doesn't exist");
      const user = await this.usersService.findOne(firebaseUser.uid);
      return {
        ...user,
        roles: firebaseUser['roles'],
      };
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
