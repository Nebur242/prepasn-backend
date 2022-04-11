/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

const globalPrefix = 'api';
const defaultVersion = '1';
const port = process.env.PORT || 1148;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(new TransformInterceptor())
    .use(helmet())
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion,
    });

  if (process.env.NODE_ENV === 'development') {
    const morgan = await import('morgan');
    app.use(
      morgan('dev', {
        stream: {
          write: (message) => Logger.debug(message.replace('\n', '')),
        },
      })
    );
  }

  const config = new DocumentBuilder()
    .setTitle('PrepaSn')
    .setDescription('The PrepaSN API documentation')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}/v${defaultVersion}`
  );
  Logger.log(
    `🏷️ Swagger is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
