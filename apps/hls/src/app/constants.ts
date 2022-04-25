import { Resolution } from './types';

export const RESOLUTIONS: Resolution[] = [
  {
    resolution: '842x480',
    bitrate: '1400k',
    audioRate: '192k',
  },
  {
    resolution: '1280x720',
    bitrate: '2800k',
    audioRate: '192k',
  },
  {
    resolution: '1920x1080',
    bitrate: '5000k',
    audioRate: '256k',
  },
];

export const SEGMENT_DURATION = 10;
export const MISC_PARAMS = '-hide_banner -y';

export const MAX_BITRATE_RATIO = 1.07;
export const RATE_MONITOR_BUFFER_RATIO = 1.5;

export const TMP_DIR = process.env.TMP_DIR || '/tmp';
export const TASK_DEFINITION =
  process.env.TASK_DEFINITION || 'ffmpeg-node-hls-task-definition';
export const REGION = process.env.REGION || 'us-east-1';
export const S3_URL = process.env.S3_URL;
export const CLUSTER_NAME = process.env.CLUSTER_NAME || 'ffmpeg-node-cluster2';
export const CONTAINER_NAME =
  process.env.CONTAINER_NAME || 'ffmpeg-node-hls-container';
export const AWS_EXECUTION_ENV = process.env.AWS_EXECUTION_ENV;
