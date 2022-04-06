import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '@prepa-sn/shared/enums';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private message: string;

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const { statusCode } = context.switchToHttp().getResponse();
    const { method } = context.switchToHttp().getRequest();

    switch (method) {
      case 'GET':
        this.message = Message.FOUND;
        break;
      case 'POST':
        this.message = Message.CREATED;
        break;
      case 'PUT':
        this.message = Message.UPDATED;
        break;
      case 'PATCH':
        this.message = Message.UPDATED;
        break;
      case 'DELETE':
        this.message = Message.DELETED;
        break;
      default:
        this.message = '';
    }

    return next.handle().pipe(
      map((data) => {
        if (this.message) {
          return {
            statusCode,
            message: this.message,
            data,
          };
        }
        return {
          statusCode,
          data,
          message: 'Success',
        };
      })
    );
  }
}
