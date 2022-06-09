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
  private readonly logger: Logger = new Logger('TypeOrmErrorsFilter');
  private readonly errors: Map<string, HttpStatus> = new Map<
    string,
    HttpStatus
  >();

  constructor() {
    //Duplicate entry's error code or Unique constraint error code
    this.errors.set('23505', HttpStatus.BAD_REQUEST);
    //Foreign key constraint error code
    this.errors.set('23503', HttpStatus.BAD_REQUEST);
    //Not null constraint error code
    this.errors.set('23502', HttpStatus.BAD_REQUEST);
    //Check constraint error code
    this.errors.set('23514', HttpStatus.BAD_REQUEST);
  }

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const message: string = exception.message || 'Something Went Wrong';
    const { detail: error, code } = exception.driverError || {
      detail: 'Unknown Error',
      code: 500,
    };
    const statusCode: number = this.errors.get(code) || 500;

    this.logger.error(`${message} - ${error} - ${code}`, exception.stack);

    response.status(statusCode).json({
      statusCode,
      message,
      error,
    });
  }
}
