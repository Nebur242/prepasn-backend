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
export const TASK_DEFINITION = process.env.TASK_DEFINITION;
export const REGION = process.env.AWS_DEFAULT_REGION;
export const S3_URL = process.env.S3_URL;
export const CLUSTER_NAME = process.env.CLUSTER_NAME;
export const CONTAINER_NAME = process.env.CONTAINER_NAME;
export const AWS_EXECUTION_ENV = process.env.AWS_EXECUTION_ENV || '';
export const PUBLIC_SUBNETS_SSM_KEY = process.env.PUBLIC_SUBNETS_SSM_KEY;
export const SECURITY_GROUP_SSM_KEY = process.env.SECURITY_GROUP_SSM_KEY;
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION;
