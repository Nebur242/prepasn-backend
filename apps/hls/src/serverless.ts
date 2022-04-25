import { bootstrap } from './app/ecs';
import { handler } from './app/lambda';
import { AWS_EXECUTION_ENV } from './app/constants';
import { Fn } from './app/types';

let moduleExports: Fn = () => null;

if (AWS_EXECUTION_ENV.includes('AWS_ECS')) {
  // ffmpeg service
  bootstrap();
} else {
  // lambda service
  moduleExports = handler;
}

module.exports = moduleExports;
