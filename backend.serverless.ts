import type { Serverless } from 'serverless/aws';
import { readdirSync } from 'fs';
import {
  excludeFileOrFolder,
  getServerlessEnvVariables,
  getBuildDir,
} from './libs/serverless/helpers';
import {
  CloudFrontLambdaUrl,
  IncludeDependencies,
  ServerlessOffline,
} from './libs/serverless/plugins';
import { validate } from './apps/backend/src/common/config';

const service = 'backend';
const environmentVariables = validate(getServerlessEnvVariables(service));
const buildDir = getBuildDir(service);

const serverlessConfig: Serverless = {
  service,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    architecture: 'arm64',
  },
  package: {
    patterns: [...readdirSync('./').map(excludeFileOrFolder), buildDir],
  },
  functions: {
    [service]: {
      handler: `${buildDir}/main.handler`,
      url: true,
      environment: environmentVariables,
      events: [],
    },
  },
  plugins: [ServerlessOffline, IncludeDependencies, CloudFrontLambdaUrl],
  custom: {
    includeDependencies: {
      enableCaching: true,
    },
  },
};

module.exports = serverlessConfig;
