import { MAX_BITRATE_RATIO, RATE_MONITOR_BUFFER_RATIO } from '../app/constants';
import { OutputStreamProperties } from '../app/types';

export function getOutputStreamProperties(
  bitrate: string,
  resolution: string
): OutputStreamProperties {
  const maxrate = parseInt(bitrate.replace('k', '')) * MAX_BITRATE_RATIO;
  const bufsize =
    parseInt(bitrate.replace('k', '')) * RATE_MONITOR_BUFFER_RATIO;
  const bandwidth = parseInt(bitrate.replace('k', '')) * 1000;
  const [width, height] = resolution.split('x').map(Number);
  return { maxrate, bufsize, bandwidth, width, height, name: `${height}p` };
}
