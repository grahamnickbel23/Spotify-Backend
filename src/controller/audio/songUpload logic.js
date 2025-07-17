import ffmpegService from "./ffmpeg logic.js";
import genious from 'genius-lyrics';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';
import AWSService from '../../utils/aws utils.js';
import songModel from "../../model/song/songModel.js";
import lyricsModel from "../../model/song/lyricsModel.js";
import fs from 'fs/promises';
import path from 'path';

export default class songUpload {

  // function to handel all upload
  static async globalUpload(req, res) {
    // get all the incoming info
    const info = req.body;
    const audioData = req.files['songFile'][0];
    const thumbnailImg = req.files['thumbnail'][0];

    // 1st upload song to local file and do all the processing
    const dashLink = await songUpload.localUpload(audioData, res);

    // then upload songs to aws and return aws folder link
    const audioAwsLink = await songUpload.awsUpload(dashLink, res);

    // upload song tumbnil to aws and return aws folder link
    const thumbnailAws = await songUpload.thumbnailUpload(thumbnailImg.path, res, uuid());

    // get the song lyrics from genius
    const lyricsId = await songUpload.lyricsUpload(info.title, res);

    // then upload all info to mongoDB
    await songUpload.mongoDbUpload(audioAwsLink.url, thumbnailAws.url, info, lyricsId);

    // delete song folder after all upload is complete
    await fs.rm(dashLink, { recursive: true, force: true });

    // return ok to user if all goof
    return res.status(200).json({
      success: true,
      message: `song upload succesful`
    });
  }

  // function for local upload handeling
  static async localUpload(data, res) {
    try {

      //Convert original to different bitrates
      const [songFile128kbps, songFile64kbps, songFile32kbps] = await Promise.all([
        ffmpegService.convertToOpus(data.path),
        ffmpegService.convertTo64kbps(data.path),
        ffmpegService.convertTo32kbps(data.path)
      ])

      // DASH conversion
      const [dashManifest] = await Promise.all([
        ffmpegService.convertToDASH(songFile128kbps, songFile64kbps, songFile32kbps, uuid()),
      ]);


      // delete all unecessey file
      await Promise.all([
        ffmpegService.deleteFile(data.path),
        ffmpegService.deleteFile(songFile128kbps),
        ffmpegService.deleteFile(songFile64kbps),
        ffmpegService.deleteFile(songFile32kbps)
      ])

      // return dash link
      return path.dirname(dashManifest)

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Audio processing failed',
        error: err.message
      });
    }
  }

  // function for thumbnail image processing
  static async thumbnailUpload(filepath, res, uuid) {
  
    // tempurary output output directory
    const tempFile = path.join('uploads', `${uuid}.webp`)

    try {
      // image processing
      await sharp(filepath)
        .resize(500, 500, {
          fit: sharp.fit.outside,
          withoutReduction: true,
        })
        .toFormat('webp')
        .toFile(tempFile)

        // aws upload
        const thumbnailBucket = process.env.THUMBNAIL_BUCKET;
        const awsInfo = await AWSService.uploadSingleFileToAWS(thumbnailBucket, tempFile);

        // delete temp & original file
        await Promise.all([
          ffmpegService.deleteFile(filepath),
          ffmpegService.deleteFile(tempFile)
        ])

        // return aws link
        return awsInfo

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Thumbnail upload failed',
        error: err.message
      });
    }
  }

  // function for aws upload handelling
  static async awsUpload(folderPath, res) {
    try {
      const audioBucket = process.env.AUDIO_BUCKET;

      // upload to aws 
      const awsInfo = await AWSService.uploadAWS(audioBucket, folderPath);
      // retuen aws info (also contain link)
      return awsInfo;

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'AWS upload failed',
        error: err.message
      });
    }
  }

  // function to fetch lyrics
  static async lyricsUpload(name, res) {
    const client = new genious.Client(process.env.CLIENT_ACCESS_TOKEN);
    try {
      async function lyricsDownload(name) {

        const search = await client.songs.search(name);
        const song = search[0];

        const lyrics = await song.lyrics();
        return lyrics
      }

      const lyrics = await lyricsDownload(name);

      const newData = lyricsModel({ lyrics: lyrics });
      const savedInfo = await newData.save();

      // return document id
      return savedInfo._id;

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'lyrics download failed',
        error: err.message
      });
    }
  }

  // function for mongoDB upload handelling
  static async mongoDbUpload(audioURL, thumbnail, info, lyrics) {
    // add audio aws link
    info.audioLink = audioURL;
    // add thumbnail aws link
    info.thumbnailLink = thumbnail;
    //add document id of lyrics
    info.lyrics = lyrics;

    // save info in mongoose
    const newData = songModel(info);
    await newData.save();
  }
}