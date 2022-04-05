/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

const globalPrefix = 'api';
const port = process.env.PORT || 1148;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()).setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('PrepaSn')
    .setDescription('The PrepaSN API documentation')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application and swagger are running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
