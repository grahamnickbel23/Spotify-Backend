import { PrismaClient } from "@prisma/client.js";
import localAuth from "../../utils/localAuth utils.js";

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