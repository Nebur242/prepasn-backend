/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const defaultVersion = '1';
  const port = process.env.PORT || 1148;

  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(new TransformInterceptor())
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
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application and swagger are running on: http://localhost:${port}/${globalPrefix}/v${defaultVersion}`
  );
}

bootstrap();
