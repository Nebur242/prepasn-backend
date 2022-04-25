import ffmpeg, { ffprobe, FfprobeData } from 'fluent-ffmpeg';
import path from 'path';
import { TMP_DIR } from '../app/constants';
import { createDirectory } from './prepare';

function getExtension(source: string, keepDot?: boolean) {
  const ext = path.extname(source.split('?')[0]);
  if (keepDot) {
    return ext;
  }
  return ext.substring(1);
}

function ffprobeAsync(file: string, options: string[]) {
  return new Promise<FfprobeData>((resolve, reject) => {
    ffprobe(file, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

const videoStreamOptions =
  '-select_streams v:0 -show_entries stream=width,height,r_frame_rate';
const audioStreamOptions = '-select_streams a:0 -show_entries stream=bit_rate';

export async function getInputStreamProperties(sourcePath: string) {
  const [videoStreamResult, audioStreamResult] = await Promise.all([
    ffprobeAsync(sourcePath, videoStreamOptions.split(' ')),
    ffprobeAsync(sourcePath, audioStreamOptions.split(' ')),
  ]);

  const sourceAudioBitRateFormatted = parseInt(
    `${Number(audioStreamResult.streams[0].bit_rate) / 1000}`
  );
  const {
    width: sourceWidth,
    height: sourceHeight,
    r_frame_rate: frameRate,
  } = videoStreamResult.streams[0];

  const keyFramesInterval = parseInt(eval(frameRate));

  return {
    sourceWidth,
    sourceHeight,
    keyFramesInterval,
    sourceAudioBitRateFormatted,
  };
}

export async function compressVideo(source: string) {
  const extension = getExtension(source);
  await createDirectory(`${TMP_DIR}/compressed`);
  const output = `${TMP_DIR}/compressed/${Date.now()}.${extension}`;
  return new Promise<string>((resolve, reject) => {
    ffmpeg()
      .input(source)
      .videoCodec('libx265')
      .outputOptions(['-crf 28'])
      .output(output)
      .on('end', () => resolve(output))
      .on('error', reject)
      .run();
  });
}
