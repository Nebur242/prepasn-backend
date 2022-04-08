// decorators.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodeTokenPipe } from '../pipes/decode-token.pipe';

export const GetUserToken = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().headers.authorization;
});

export const GetDecodedToken = (_data?: unknown) => GetUserToken(_data, DecodeTokenPipe);