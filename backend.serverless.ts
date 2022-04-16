import type { Serverless } from 'serverless/aws';
import { parse } from 'dotenv';
import { readFileSync, readdirSync } from 'fs';
const pick = require('lodash.pick');

const service = 'backend';
const runtime = 'nodejs14.x';
const appWorkspacePath = require('./workspace.json').projects[service];

function parseEnv(path: string) {
  try {
    const envContents = readFileSync(path);
    return parse(envContents);
  } catch (e) {}
}

function getDotenvVariables() {
  return {
    ...parseEnv(`${__dirname}/.env`),
    ...parseEnv(`${__dirname}/.local.env`),
    ...parseEnv(`${__dirname}/.env.local`),
    ...parseEnv(`${__dirname}/${appWorkspacePath}/.env`),
    ...parseEnv(`${__dirname}/${appWorkspacePath}/.local.env`),
    ...parseEnv(`${__dirname}/${appWorkspacePath}/.env.local`),
  };
}

function excludeFileOrFolder(fileOrFolder: string) {
  return `!./${fileOrFolder}`;
}

function getServerlessEnvVariables() {
  // TODO: use ssm or other mechanism to store secrets
  // and sync (for the first execution) the local parameters with remote ones
  // @see https://www.serverless.com/framework/docs/providers/aws/guide/variables#reference-variables-using-the-ssm-parameter-store
  const variables = Object.assign({}, process.env, getDotenvVariables());
  return pick(variables, [
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
  ]);
}

const serverlessConfig: Serverless = {
  service,
  provider: {
    name: 'aws',
    runtime,
    architecture: 'arm64',
  },
  package: {
    patterns: [
      ...readdirSync('./').map(excludeFileOrFolder),
      `./dist/${appWorkspacePath}/**`,
    ],
  },
  functions: {
    [service]: {
      handler: `dist/${appWorkspacePath}/main.handler`,
      url: true,
      environment: getServerlessEnvVariables(),
      events: [],
    },
  },
  plugins: [
    'serverless-offline',
    'serverless-plugin-include-dependencies',
    './libs/serverless-custom-plugin',
  ],
  custom: {
    includeDependencies: {
      enableCaching: true,
    },
  },
};

module.exports = serverlessConfig;
