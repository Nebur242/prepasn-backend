import type { Serverless } from 'serverless/aws';
import { parse } from 'dotenv';
import { readFileSync, readdirSync } from 'fs';

const service = 'backend';
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

const serverlessConfig: Serverless = {
  service,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
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
      // TODO: associate the created lambda function url to an alias
      // to control the released version or use weigthed deployment
      url: true,
      // TODO: use ssm or other mechanism to store secrets
      // and sync (for the first execution) the local parameters with remote ones
      // @see https://www.serverless.com/framework/docs/providers/aws/guide/variables#reference-variables-using-the-ssm-parameter-store
      environment: getDotenvVariables(),
      events: [],
    },
  },
  plugins: [
    'serverless-offline',
    'serverless-plugin-include-dependencies',
    './libs/serverless-lambda-function-url-cloudfront',
  ],
  custom: {
    includeDependencies: {
      enableCaching: true,
    },
  },
};

module.exports = serverlessConfig;
