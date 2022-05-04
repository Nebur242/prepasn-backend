import { bootstrap } from './app/ecs';
import { handler } from './app/lambda';
import { AWS_EXECUTION_ENV } from './app/constants';

if (AWS_EXECUTION_ENV.includes('AWS_ECS')) {
  // hls service running on ECS
  bootstrap();
} else {
  // lambda service exposing the handler
  module.exports = {
    handler,
  };
}
