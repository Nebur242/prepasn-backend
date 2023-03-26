import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseService } from '../firebase/firebase.service';
import { User } from '../users/entities/user.entity';
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
      let user: User;
      const firebaseUser = await this.firebaseService.verifyToken(token);
      if (!firebaseUser) throw new UnauthorizedException("User doesn't exist");
      try {
        user = await this.usersService.findOne(firebaseUser.uid);
      } catch (error) {
        console.log(error)
      }
      return {
        ...firebaseUser,
        ...user,
        uid: firebaseUser.uid,
        roles: firebaseUser['roles'],
      };
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
