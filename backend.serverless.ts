import type { Serverless } from 'serverless/aws';
import { readdirSync } from 'fs';
import {
  excludeFileOrFolder,
  getServerlessEnvVariables,
} from './libs/serverless/helpers';
import {
  CloudFrontLambdaUrl,
  IncludeDependencies,
  ServerlessOffline,
} from './libs/serverless/plugins';

const service = 'backend';
const appWorkspacePath = require('./workspace.json').projects[service];
const buildDir = `./dist/${appWorkspacePath}`;
const envVariablesKeys = [
  'DB_HOST',
  'DB_LOGGING',
  'DB_NAME',
  'DB_PASSWORD',
  'DB_PORT',
  'DB_SSL',
  'DB_SYNC',
  'DB_TYPE',
  'DB_USERNAME',
  'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
  'FIREBASE_AUTH_URI',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_CLIENT_ID',
  'FIREBASE_CLIENT_X509_CERT_URL',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_PRIVATE_KEY_ID',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_REST_API_KEY',
  'FIREBASE_TOKEN_URI',
  'FIREBASE_TYPE',
  'NODE_TLS_REJECT_UNAUTHORIZED',
];

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
      environment: getServerlessEnvVariables(
        appWorkspacePath,
        envVariablesKeys
      ),
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
