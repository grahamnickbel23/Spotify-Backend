import { awsS3Connect } from '../../connectAWS.js';
import fs from 'fs/promises';
import path from 'path';
import { PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { pipeline } from 'stream/promises';

export default class AWSService {

    // function to upload stuff to aws
    static async uploadAWS(bucket, folderPath) {

        // main song folder name from local url
        const folderName = path.basename(folderPath);
        const files = await fs.readdir(folderPath);

        const uploadedFiles = [];

        // catch each file inside local folder and uplod to main song folder
        for (const fileName of files) {
            const filePath = path.join(folderPath, fileName);
            const fileBuffer = await fs.readFile(filePath);

            const s3Key = `${folderName}/${fileName}`; // upload to: songs/filename

            const uploadCommand = new PutObjectCommand({
                Bucket: bucket,
                Key: s3Key,
                Body: fileBuffer,
                ContentType: AWSService.getMimeType(fileName)
            });
            // aws comand via connectAWS 
            await awsS3Connect().send(uploadCommand);
            // url of each files
            const fileUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;

            uploadedFiles.push({
                name: fileName,
                url: fileUrl
            });
        }

        // retun main song folder that will be used for further processing
        return {
            bucket,
            folder: folderName,
            url: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${folderName}/`
        };
    }

    // function to upload file into aws
    static async uploadSingleFileToAWS(bucket, filepath) {

        const fileBuffer = await fs.readFile(filepath);
        const fileName = path.basename(filepath);

        const s3Key = `${fileName}`;

        const uploadCommand = new PutObjectCommand({
            Bucket: bucket,
            Key: s3Key,
            Body: fileBuffer,
            ContentType: AWSService.getMimeType(fileName),
        });

        await awsS3Connect().send(uploadCommand);

        const fileUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;

        return {
            bucket,
            key: s3Key,
            name: fileName,
            url: fileUrl,
        };
    }

    // function to update stuff to aws (folder)
    static async updateAWS(bucket, folderPath) {
        return await this.uploadAWS(bucket, folderPath)
    }

    // function to update file to aws
    static async updateFileAws(bucket, filePath){
        return await this.uploadSingleFileToAWS(bucket, filePath);
    }
    // download stuff from aws
    static async downloadAws(bucketName, awsFolderPath, localPath) {

        // comand to download from aws
        const comand = new GetObjectCommand({
            Bucket: bucketName,
            Key: awsFolderPath
        })

        // execution of the comand
        const result = await awsS3Connect().send(comand);

        // savee stream to local path
        await pipeline(result.Body, fs.createWriteStream(localPath));

        // return result
        return {
            success: true,
            savedAs: localPath,
            awsFilePath: awsFolderPath
        };
    }

    // function to delete stuffin aws
    static async deleteAWS(bucket, folderpath) {

        // main song folder prefix
        const folderPrefix = `${folderpath}`;

        // 1️⃣ List all objects inside that "folder"
        const listComand = new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: folderPrefix
        })

        const listedObject = await awsS3Connect().send(listComand);

        if (!listedObject.Contents || listedObject.Contents.length === 0) {
            return {
                success: false,
                message: "No files found to delete."
            };
        }

        // 2️⃣ Prepare list of keys to delete
        const deleteParams = {
            Bucket: bucket,
            Delete: {
                Objects: listedObject.Contents.map(obj => ({ Key: obj.Key }))
            }
        };

        // 3️⃣ Delete all in one shot
        const deleteCommand = new DeleteObjectsCommand(deleteParams);
        const deleteResult = await awsS3Connect().send(deleteCommand);

        return {
            success: true,
            deletedCount: deleteResult.Deleted.length,
            folder: folderPrefix
        };
    }

    // helper function
    static getMimeType(fileName) {
        const ext = path.extname(fileName).toLowerCase();
        const mimeTypes = {
            '.mpd': 'application/dash+xml',
            '.m4s': 'video/iso.segment',
            '.webm': 'audio/webm',
            '.mp3': 'audio/mpeg',
            '.opus': 'audio/ogg',
        };
        return mimeTypes[ext] || 'application/octet-stream';
    }

}