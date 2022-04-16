import type { Serverless } from 'serverless/aws';
import { parse } from 'dotenv';
import { readFileSync, readdirSync } from 'fs';

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
      // TODO: use ssm or other mechanism to store secrets
      // and sync (for the first execution) the local parameters with remote ones
      // @see https://www.serverless.com/framework/docs/providers/aws/guide/variables#reference-variables-using-the-ssm-parameter-store
      environment: Object.assign({}, process.env, getDotenvVariables()),
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
