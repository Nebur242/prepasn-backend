import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  applyDecorators,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Role } from '@prepa-sn/shared/enums';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard extends AuthGuard('firebase-jwt') {
  private roles: Role[] = [];

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.roles =
      this.reflector.get<Role[]>('roles', context.getClass()) ||
      this.reflector.get<Role[]>('roles', context.getHandler()) ||
      [];
    if (this.roles.length === 0) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException(err || 'Unauthorized');
    }
    const hasRole: boolean = this.roles.some((role) =>
      user.roles?.includes(role)
    );
    if (!hasRole) throw new UnauthorizedException("You don't have access");
    return user;
  }
}

export function Roles(...roles: Role[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
}
