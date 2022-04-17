import { parse } from 'dotenv';
import { readFileSync } from 'fs';
const pick = require('lodash.pick');

function parseEnv(path: string) {
  try {
    const envContents = readFileSync(path);
    return parse(envContents);
  } catch (e) {}
}

function getDotenvVariables(appWorkspacePath: string) {
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

export function getServerlessEnvVariables(
  appWorkspacePath: string,
  keys: string[]
) {
  // TODO: use ssm or other mechanism to store secrets
  // and sync (for the first execution) the local parameters with remote ones
  // @see https://www.serverless.com/framework/docs/providers/aws/guide/variables#reference-variables-using-the-ssm-parameter-store
  const variables = Object.assign(
    {},
    process.env,
    getDotenvVariables(appWorkspacePath)
  );
  const filteredEnvVariables = pick(variables, keys);
  if (filteredEnvVariables.length === 0) {
    throw new Error('[getServerlessEnvVariables] no variable found');
  }
  return filteredEnvVariables;
}
