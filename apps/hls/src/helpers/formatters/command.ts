import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import {
  getOutputStreamProperties,
  getInputStreamProperties,
  prepare,
  formatAudioRate,
} from '../';
import { MISC_PARAMS, SEGMENT_DURATION } from '../../app/constants';
import { OutputStreamProperties, Resolution } from '../../app/types';

export class FfmpegCommand {
  #cmd = '';
  #masterPlaylist = `#EXTM3U\n#EXT-X-VERSION:3\n`;
  #inputStringProperties: {
    keyFramesInterval: number;
    sourceAudioBitRateFormatted: number;
    sourceWidth: number;
  };

  constructor(
    private readonly source: string,
    private readonly target: string
  ) {
    prepare(this.target);
  }

  private registerStream(bandwidth: number, resolution: string) {
    const name = resolution.split('x')[1];
    this.#masterPlaylist += `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n${name}p.m3u8\n`;
    return this.#masterPlaylist;
  }

  async addResolution({ resolution, bitrate, audioRate }: Resolution) {
    const outputStreamProperties = getOutputStreamProperties(
      bitrate,
      resolution
    );
    this.#cmd += await this.buildCommand(
      bitrate,
      audioRate,
      outputStreamProperties
    );
    return this.registerStream(outputStreamProperties.bandwidth, resolution);
  }

  generateAdaptiveStreamingFiles() {
    try {
      const cmd = `ffmpeg ${MISC_PARAMS} -i ${this.source} ${this.#cmd}`;
      console.log(`Executing command: ${cmd}\n`);
      execSync(cmd, { stdio: 'inherit' });
      writeFileSync(`${this.target}/playlist.m3u8`, this.#masterPlaylist);
      console.log(`Done - encoded HLS is at ${this.target}/`);

      return ''; // TODO: export files path
    } catch (error) {
      console.log('An error occured', error);
    }
  }

  private async buildCommand(
    bitrate: string,
    audioRate: string,
    outputStreamProperties: OutputStreamProperties
  ) {
    if (!this.#inputStringProperties) {
      this.#inputStringProperties = await getInputStreamProperties(this.source);
    }
    const { keyFramesInterval, sourceAudioBitRateFormatted, sourceWidth } =
      this.#inputStringProperties;
    const staticParams = this.buildStaticParametersCommand(keyFramesInterval);

    const audioRateFormatted = formatAudioRate(
      audioRate,
      sourceAudioBitRateFormatted
    );

    const { width, height, maxrate, bufsize, name } = outputStreamProperties;

    let widthParam = 0;
    let heightParam = 0;

    if ((width / sourceWidth) * sourceWidth < height) {
      widthParam = -2;
      heightParam = height;
    } else {
      widthParam = width;
      heightParam = -2;
    }

    let cmd = '';

    cmd += `${staticParams} -vf scale=w=${widthParam}:h=${heightParam}`;
    cmd += ` -b:v ${bitrate} -maxrate ${maxrate}k -bufsize ${bufsize}k -b:a ${audioRateFormatted}`;
    cmd += ` -hls_segment_filename ${this.target}/${name}_%03d.ts ${this.target}/${name}.m3u8 `;

    return cmd;
  }

  private buildStaticParametersCommand(keyFramesInterval: number) {
    let staticParams = `-c:a aac -ar 48000 -c:v h264 -profile:v main -crf 19 -sc_threshold 0`;
    staticParams += ` -g ${keyFramesInterval} -keyint_min ${keyFramesInterval}`;
    staticParams += ` -hls_time ${SEGMENT_DURATION} -hls_playlist_type vod`;
    return staticParams;
  }
}
