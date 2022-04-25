export type Resolution = {
  resolution: string;
  bitrate: string;
  audioRate: string;
};

export type OutputStreamProperties = {
  maxrate: number;
  bufsize: number;
  bandwidth: number;
  width: number;
  height: number;
  name: string;
};

export type Fn = (...args) => void;
