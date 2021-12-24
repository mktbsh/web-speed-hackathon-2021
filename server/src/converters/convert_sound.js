import { ffmpeg } from '../ffmpeg';
import { AudioContext } from 'web-audio-api';
import _ from 'lodash';
import fs from 'fs/promises';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @returns {Promise<Uint8Array>}
 */
async function convertSound(buffer, options) {
  const exportFile = `export.${options.extension ?? 'mp3'}`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS('writeFile', 'file', new Uint8Array(buffer));

  await ffmpeg.run(...['-i', 'file', '-vn', exportFile]);

  return ffmpeg.FS('readFile', exportFile);
}

/**
 *
 * @param {ArrayBuffer} data
 * @returns {{
 *  max: number;
 *  peaks: number[];
 * }}
 */
async function calculate(data) {
  const context = new AudioContext();
  const buffer = await new Promise((resolve, reject) => context.decodeAudioData(data.slice(0), resolve, reject));
  // 左の音声データの絶対値を取る
  const leftData = _.map(buffer.getChannelData(0), Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = _.map(buffer.getChannelData(1), Math.abs);
  const normalized = _.map(_.zip(leftData, rightData), _.mean);
  const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
  const peaks = _.map(chunks, _.mean);

  return {
    peaks,
    max: _.max(peaks),
  };
}

/**
 *
 * @param {Uint8Array} file
 */
async function convertSVG(file) {
  const { max, peaks } = await calculate(file.buffer);

  return peaks
    .map((peak, i) => `<rect fill="#2563EB" height="${peak / max}" width="1" x="${i}" y="${1 - peak / max}"`)
    .join(',');
}

export { convertSound, convertSVG };
