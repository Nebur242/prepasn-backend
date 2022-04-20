import { parse } from 'dotenv';
import { readFileSync } from 'fs';

function parseEnv(path: string) {
  try {
    const envContents = readFileSync(path);
    return parse(envContents);
  } catch (e) {}
}

function getAppWorkspacePath(service: string) {
  return require(`${__dirname}/../../../workspace.json`).projects[service];
}

function getDotenvVariables(service: string) {
  const appWorkspacePath = getAppWorkspacePath(service);
  return {
    ...parseEnv(`${__dirname}/../../../.env`),
    ...parseEnv(`${__dirname}/../../../.local.env`),
    ...parseEnv(`${__dirname}/../../../.env.local`),
    ...parseEnv(`${__dirname}/../../../${appWorkspacePath}/.env`),
    ...parseEnv(`${__dirname}/../../../${appWorkspacePath}/.local.env`),
    ...parseEnv(`${__dirname}/../../../${appWorkspacePath}/.env.local`),
  };
}

export function excludeFileOrFolder(fileOrFolder: string) {
  return `!./${fileOrFolder}`;
}

export function getBuildDir(service: string) {
  const appWorkspacePath = getAppWorkspacePath(service);
  return `./dist/${appWorkspacePath}`;
}

export function getServerlessEnvVariables(
  service: string
): Record<string, unknown> {
  // TODO: use ssm or other mechanism to store secrets
  // and sync (for the first execution) the local parameters with remote ones
  // @see https://www.serverless.com/framework/docs/providers/aws/guide/variables#reference-variables-using-the-ssm-parameter-store
  return Object.assign({}, process.env, getDotenvVariables(service));
}
