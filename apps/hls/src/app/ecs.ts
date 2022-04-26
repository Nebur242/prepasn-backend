import { cleanDirectory, compressVideo, FfmpegCommand } from '../helpers';
import { RESOLUTIONS, S3_URL, TMP_DIR } from './constants';

export const bootstrap = async () => {
  let source = S3_URL;
  const target = `${TMP_DIR}/hls-service/${Date.now()}`;

  console.log(`Going to compress video ${S3_URL}`);
  console.time('compressVideo');
  source = await compressVideo(source);
  console.timeEnd('compressVideo');
  console.log(`Finished compressing video ${S3_URL}, output: ${source}`);

  const ffmpegCommand = new FfmpegCommand(source, target);

  console.time('addResolution');
  for (const resolution of RESOLUTIONS) {
    console.log(`Going to add resolution ${resolution.resolution.split('x')[1]}p for video ${source}`);
    await ffmpegCommand.addResolution(resolution);
    console.log(`Finished adding resolution ${resolution.resolution.split('x')[1]}p for video ${source}`);
  }
  console.timeEnd('addResolution');

  console.log(`Going to generate resolutions for video ${source}`);
  console.time('generateAdaptiveStreamingFiles');
  ffmpegCommand.generateAdaptiveStreamingFiles();
  console.log(`Finished generating resolutions for video ${source}`);
  console.timeEnd('generateAdaptiveStreamingFiles');

  // TODO: upload files recursively back to S3
  // TODO: update db entry to put ffmpeg files path
  cleanDirectory(target);
  cleanDirectory(source);
};
