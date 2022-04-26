import { mkdirSync, rmSync, existsSync } from 'fs';

export function cleanDirectory(path: string) {
  if (!existsSync(path)) return;
  return rmSync(path, { recursive: true });
}

export function createDirectory(path: string) {
  if (existsSync(path)) return path;
  return mkdirSync(path, { recursive: true });
}

export function prepare(outputPath: string) {
  cleanDirectory(outputPath);
  createDirectory(outputPath);
}
