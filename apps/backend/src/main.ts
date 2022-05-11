import { NestFactory } from '@nestjs/core';
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { TypeOrmErrorsFilter } from './common/filters/typeorm-errors.filter';

const globalPrefix = 'api';
const defaultVersion = '1';
const port = process.env.port || process.env.PORT || 1148;

export function setupGlobalMiddlewares(app: INestApplication) {
  return app
    .setGlobalPrefix(globalPrefix)
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalFilters(new TypeOrmErrorsFilter())
    .use(helmet())
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion,
    });
}

export async function setupDevEnvironment(app: INestApplication) {
  if (process.env.NODE_ENV === 'development') {
    const morgan = await import('morgan');
    app.use(
      morgan.default('dev', {
        stream: {
          write: (message) => Logger.debug(message.replace('\n', '')),
        },
      })
    );
  }
}

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('PrepaSn')
    .setDescription('The PrepaSN API documentation')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  setupGlobalMiddlewares(app);
  setupDevEnvironment(app);
  setupSwagger(app);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}/v${defaultVersion} and Swagger on: http://localhost:${port}/${globalPrefix}`
  );
}

if (require.main === module) {
  bootstrap();
}
