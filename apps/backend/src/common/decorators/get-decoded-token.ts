// decorators.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodeTokenPipe } from '../pipes/decode-token.pipe';

export const GetClaims = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().headers.authorization
);

export const GetDecodedToken = (_data?: unknown) =>
  GetClaims(_data, DecodeTokenPipe);
