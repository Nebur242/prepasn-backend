export function formatAudioRate(
  audioRate: string,
  sourceAudioBitRateFormatted: number
) {
  let audioRateFormatted = audioRate;
  if (Number(audioRate.replace('k', '')) > sourceAudioBitRateFormatted) {
    audioRateFormatted = sourceAudioBitRateFormatted + 'k';
  }
  return audioRateFormatted;
}
