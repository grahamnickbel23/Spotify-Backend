import { PrismaClient } from "@prisma/client.js";
import localAuth from "../../utils/localAuth utils.js";
import AWSService from "../../utils/aws utils.js";
import sharp from "sharp";
import path from 'path';
import { v4 as uuid } from 'uuid';
import ffmpegService from "../audio/ffmpeg logic.js";

const prisma = new PrismaClient();

export default class editUserDetails {

    // edit username
    static async editUsername(req, res) {

        // collect user data
        const { email, phone, password, newUsername } = req.body;

        // cheak for auth
        const userData = await localAuth(prisma, email, phone, password);

        // return error if auth failed
        if (userData.error) {
            return res.status(userData.status).json({
                success: false,
                message: userData.message
            })
        }

        // if all ok procceade to change username
        await prisma.user.update({
            where: { id: userData.id },
            data: { username: newUsername }
        })

        // return ok if all good
        return res.status(200).json({
            success: true,
            message: `username updated successfully`
        })

    }

    // edit profile picture
    static async editProfileImage(req, res) {

        // get the profile image
        const profileImage = req.file;
        // collect user data
        const { email, phone, password } = req.body;
        // cheak for auth
        const userData = await localAuth(prisma, email, phone, password);

        // return error if auth failed
        if (userData.error) {
            return res.status(userData.status).json({
                success: false,
                message: userData.message
            })
        }

        // import uuid
        const id = uuid();
        // tempurary output directory
        const tempFile = path.join('uploads', `${id}.webp`)

        // upload image to aws
        try {
            // image processing
            await sharp(profileImage.path)
                .resize(200, 200, {
                    fit: sharp.fit.outside,
                    withoutReduction: true,
                })
                .toFormat('webp')
                .toFile(tempFile)

            // aws upload
            const profileImageBucket = process.env.PROFILE_PICTURE_BUCKET;
            const awsInfo = await AWSService.updateFileAws(profileImageBucket, tempFile);

            // delete temp & original file
            await Promise.all([
                ffmpegService.deleteFile(profileImage.path),
                ffmpegService.deleteFile(tempFile)
            ])

            // if all ok procceade to change username
            await prisma.user.update({
                where: { id: userData.id },
                data: { profileImagelink: awsInfo }
            })

            // return ok if all good
            return res.status(200).json({
                success: true,
                message: `username updated successfully`
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'profile Image upload failed',
                error: err.message
            });
        }
    }

    // edit birthyear
    static async editBirthyear(req, res) {

        // collect user data
        const { email, phone, password, newBirthyear } = req.body;

        // cheak for auth
        const userData = await localAuth(prisma, email, phone, password);

        // return error if auth failed
        if (userData.error) {
            return res.status(userData.status).json({
                success: false,
                message: userData.message
            })
        }

        // if all ok procceade to change birth year
        await prisma.user.update({
            where: { id: userData.id },
            data: { birthYear: newBirthyear }
        })

        // return ok if all good
        return res.status(200).json({
            success: true,
            message: `birth year updated successfully`
        })

    }

    // edit gender
    static async editGender(req, res) {

        // collect user data
        const { email, phone, password, newGender } = req.body;

        // cheak for auth
        const userData = await localAuth(prisma, email, phone, password);

        // return error if auth failed
        if (userData.error) {
            return res.status(userData.status).json({
                success: false,
                message: userData.message
            })
        }

        // if all ok procceade to change gender
        await prisma.user.update({
            where: { id: userData.id },
            data: { gender: newGender }
        })

        // return ok if all good
        return res.status(200).json({
            success: true,
            message: `gender updated successfully`
        })

    }

    // edit language
    static async editLanguage(req, res) {

        // collect user data
        const { email, phone, password, newLanguage } = req.body;

        // cheak for auth
        const userData = await localAuth(prisma, email, phone, password);

        // return error if auth failed
        if (userData.error) {
            return res.status(userData.status).json({
                success: false,
                message: userData.message
            })
        }

        // if all ok procceade to change language
        await prisma.user.update({
            where: { id: userData.id },
            data: { language: newLanguage }
        })

        // return ok if all good
        return res.status(200).json({
            success: true,
            message: `language updated successfully`
        })

    }

    // edit location
    static async editlocation(req, res) {

        // collect user data
        const { email, phone, password, newlocation } = req.body;

        // cheak for auth
        const userData = await localAuth(prisma, email, phone, password);

        // return error if auth failed
        if (userData.error) {
            return res.status(userData.status).json({
                success: false,
                message: userData.message
            })
        }

        // if all ok procceade to change location
        await prisma.user.update({
            where: { id: userData.id },
            data: { location: newlocation }
        })

        // return ok if all good
        return res.status(200).json({
            success: true,
            message: `location updated successfully`
        })

    }
}