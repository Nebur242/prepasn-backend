import { bootstrap } from './app/ecs';
import { handler } from './app/lambda';
import { AWS_EXECUTION_ENV } from './app/constants';

if (AWS_EXECUTION_ENV.includes('AWS_ECS')) {
  // ffmpeg service
  bootstrap();
} else {
  // lambda service
  module.exports = {
    handler,
  };
}
