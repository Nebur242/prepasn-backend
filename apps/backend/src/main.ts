/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app/app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const defaultVersion = '1';
  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalInterceptors(new TransformInterceptor())
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion,
    });
  if (process.env.NODE_ENV === 'development') {
    app.use(
      morgan('dev', {
        stream: {
          write: (message) => Logger.debug(message.replace('\n', '')),
        },
      })
    );
  }
  const port = process.env.PORT || 1148;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on test: http://localhost:${port}/${globalPrefix}/v${defaultVersion}`
  );
}

bootstrap();
