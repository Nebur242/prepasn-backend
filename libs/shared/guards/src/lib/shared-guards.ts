import {
  ExecutionContext,
  CanActivate,
  SetMetadata,
  applyDecorators,
  UseGuards,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TestGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (process.env.NODE_ENV === 'production') return false;
    return (
      this.reflector.get<boolean>('testOnly', context.getHandler()) ||
      this.reflector.get<boolean>('testOnly', context.getClass())
    );
  }
}

export function TestOnly() {
  return applyDecorators(SetMetadata('testOnly', true), UseGuards(TestGuard));
}
