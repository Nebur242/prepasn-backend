import type { Serverless } from 'serverless/aws';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';

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

const serverlessConfig: Serverless = {
  service: app,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
  },
  functions: {
    backend: {
      handler: `dist/${appWorkspacePath}/main.handler`,
      environment: getDotenvVariables(),
      events: [
        {
          http: {
            method: 'ANY',
            path: '/',
          },
        },
        {
          http: {
            method: 'ANY',
            path: '{proxy+}',
          },
        },
      ],
    },
  },
  plugins: ['serverless-offline'],
};

module.exports = serverlessConfig;
