import { cleanDirectory, FfmpegCommand } from '../helpers';
import { RESOLUTIONS, S3_URL, TMP_DIR } from './constants';

export const bootstrap = async () => {
  const target = `${TMP_DIR}/hls-service/${Date.now()}`;

  const ffmpegCommand = new FfmpegCommand(S3_URL, target);

  for (const resolution of RESOLUTIONS) {
    await ffmpegCommand.addResolution(resolution);
  }

  ffmpegCommand.generateAdaptiveStreamingFiles();

  // TODO: upload files recursively back to S3
  // TODO: update db entry to put ffmpeg files path
  cleanDirectory(target);
};
