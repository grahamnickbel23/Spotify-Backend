import { PrismaClient } from "@prisma/client";
import localAuth from "../../utils/localAuth utils.js";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default class editAuth {

    // edit email
    static async editEmail(req, res) {

        // get the user info
        const { oldEmail, oldPhone, newEmail, password } = req.body;

        // 1st do auth
        const userData = await localAuth(prisma, oldEmail, oldPhone, password);

        // return erorr if auth failed
        if (userData.error) {
            return res.status(userData.status).json({
                success: false,
                message: userData.message
            })
        }

        // if all good go for email update
        await prisma.user.update({
            where: { id: userData.id },
            data: { email: newEmail }
        })

        // return ok if all good
        return res.status(200).json({
            success: true,
            message: `email updated successfully`
        })
    }

    // edit phone
    static async editPhone(req, res) {

        // collect user data
        const { email, oldPhone, newPhone, password } = req.body;

        // cheak for auth
        const userData = await localAuth(prisma, email, oldPhone, password);

        // return error if auth failed
        if(userData.error){
            return res.status(userData.status).json({
                success:false,
                message:userData.message
            })
        }

        // if all ok procceade to change phone number
        await prisma.user.update({
            where: { id: userData.id },
            data: { phone: newPhone }
        })

        // return ok if all good
        return res.status(200).json({
            success: true,
            message: `phone updated successfully`
        })

    }

    // edit password
    static async editPassword(req, res){

        // collect user data
        const { email, phone, oldPassword, newPassword } = req.body;

        // cheack for auth
        const userData = await localAuth(prisma, email, phone, oldPassword);

        
        // return error if auth failed
        if(userData.error){
            return res.status(userData.status).json({
                success:false,
                message:userData.message
            })
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // if all ok procceade to change password
        await prisma.user.update({
            where: { id: userData.id },
            data: { password: hashedPassword }
        })

        // return ok if all good
        return res.status(200).json({
            success: true,
            message: `password updated successfully`
        })
    }
}