import type { Serverless } from 'serverless/aws';
import { parse } from 'dotenv';
import { readFileSync, readdirSync } from 'fs';

const app = 'backend';
const appWorkspacePath = require('./workspace.json').projects[app];

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
  service: app,
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
    backend: {
      handler: `dist/${appWorkspacePath}/main.handler`,
      url: true,
      environment: getDotenvVariables(),
      events: [],
    },
  },
  plugins: ['serverless-offline', 'serverless-plugin-include-dependencies'],
  custom: {
    includeDependencies: {
      enableCaching: true,
    },
  },
};

module.exports = serverlessConfig;
