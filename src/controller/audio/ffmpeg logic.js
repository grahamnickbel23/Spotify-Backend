import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs'
import fsi from 'fs/promises';

export default class ffmpegService {

  // 1st convert incoming audio into 128k .opus
  static async convertToOpus(inputPath) {
    try {
      const outputPath = inputPath.replace(path.extname(inputPath), '.opus');

      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .audioCodec('libopus')
          .audioBitrate('128k')
          .output(outputPath)
          .on('end', () => resolve())
          .on('error', err => reject(err))
          .run();
      });

      return outputPath;

    } catch (err) {
      throw err;
    }
  }

  // convert 128k opus to 64k opus
  static async convertTo64kbps(inputPath) {
    try {
      const outputPath = inputPath.replace(path.extname(inputPath), '---64kbps.opus');

      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .audioCodec('libopus')
          .audioBitrate('64k')
          .output(outputPath)
          .on('end', () => resolve())
          .on('error', err => reject(err))
          .run();
      });

      return outputPath;

    } catch (err) {
      throw err;
    }
  }

  // convert 128k opus to 32k opus
  static async convertTo32kbps(inputPath) {
    try {
      const outputPath = inputPath.replace(path.extname(inputPath), '---32kbps.opus');

      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .audioCodec('libopus')
          .audioBitrate('32k')
          .output(outputPath)
          .on('end', () => resolve())
          .on('error', err => reject(err))
          .run();
      });

      return outputPath;

    } catch (err) {
      throw err;
    }
  }

  // convert to DASH from input audio
  static async convertToDASH(input128k, input64k, input32k, uuid) {
    try {
      const baseName = uuid;
      const outputDir = path.join('uploads', `${baseName}`);
      const manifestPath = path.join(outputDir, 'manifest.mpd');

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      await new Promise((resolve, reject) => {
        ffmpeg()
          .input(input128k)
          .input(input64k)
          .input(input32k)
          .outputOptions([
            '-map 0:a',
            '-map 1:a',
            '-map 2:a',
            '-c:a libopus',
            '-b:a:0 128k',
            '-b:a:1 64k',
            '-b:a:2 32k',
            '-dash_segment_type webm',
            '-use_timeline 1',
            '-use_template 1',
            '-window_size 5',
            '-adaptation_sets', 'id=0,streams=a',
            '-init_seg_name', path.join(outputDir, 'init-$RepresentationID$.m4s'),
            '-media_seg_name', path.join(outputDir, 'chunk-$RepresentationID$-$Number$.m4s')
          ])
          .output(manifestPath)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });


      return manifestPath;
    } catch (err) {
      throw err;
    }
  }

  // delete all the unneceery file
  static async deleteFile(filePath) {
    // delete file
    try {
      await fsi.unlink(filePath);
    } catch (err) {
      throw err
    }
  }
}