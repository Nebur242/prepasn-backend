import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

import { AppModule } from './app/app.module';
import { setupGlobalMiddlewares } from './main';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  if (!server) {
    const app = await NestFactory.create(AppModule);

    await setupGlobalMiddlewares(app).init();

    const expressApp = app.getHttpAdapter().getInstance();
    server = serverlessExpress({ app: expressApp });
  }
  return server;
}

export const handler: Handler = async (
  event: unknown,
  context: Context,
  callback: Callback
) => {
  server = await bootstrap();
  return server(event, context, callback);
};
