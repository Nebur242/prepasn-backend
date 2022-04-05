/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const defaultVersion = '1';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion,
  });
  const port = process.env.PORT || 1148;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on test: http://localhost:${port}/${globalPrefix}/v${defaultVersion}`
  );
}

bootstrap();
