import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmErrorsFilter implements ExceptionFilter {
  logger = new Logger('TypeOrmErrorsFilter');
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    let statusCode = 500;
    const response = host.switchToHttp().getResponse();
    const message: string = exception.message;
    const error = exception.driverError.detail;
    const code = exception.driverError.code;
    this.logger.error(`${message} - ${error} - ${code}`, exception.stack);

    if (code === '23505' || code === '23503' || code === '23502') {
      statusCode = HttpStatus.BAD_REQUEST;
    }

    const clientResponse = {
      statusCode,
      message: message || 'Something Went Wrong',
      error,
    };

    response.status(clientResponse.statusCode).json(clientResponse);
  }
}
