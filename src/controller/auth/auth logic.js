import userModel from "../../model/userModel.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import randomString from 'crypto-random-string';

const prisma = new PrismaClient();

export default class userAuth {

    // user signup
    static async userSignup(req, res) {

        // get the incoming data
        const data = req.body;
        const { email, phone, } = req.body;

        // cheak if user exist
        const emailExisit = await prisma.user.findUnique({ where: { email: email } });
        const phoneExisit = await prisma.user.findUnique({ where: { phone: phone } });

        // return error if email or phone exisit
        if (emailExisit || phoneExisit) {
            return res.status(409).json({
                success: false,
                message: `user already exisit`
            })
        }

        // if no error so far hashed password
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        // registration for new user
        const newUser = await prisma.user.create({ data: data });

        // extract 
        const userDataInMongo = { userId: newUser.id, username: newUser.username }
        const mongoData = userModel(userDataInMongo);
        await mongoData.save();

        // if all good return ok code
        return res.status(200).json({
            success: true,
            message: `user registared successfuly`
        })
    }

    // user login
    static async userlogin(req, res) {

        // collect all incoming data
        const { email, phone, password } = req.body;
        
        // cheak if user exisit
        async function userAuth(email, phone){

            if(!phone && email){
                const emailExisit = await prisma.user.findUnique({ where: { email: email } });
                return emailExisit;
            }else{
                const phoneExisit = await prisma.user.findUnique({ where: { phone: phone } });
                return phoneExisit;
            }

        }

        const exisitUserDetails = await userAuth(email, phone);

        // if not send error
        if (!exisitUserDetails) {
            return res.status(404).json({
                success: false,
                message: `user does not exisit`
            })
        }

        // if user exisit now cheak for password
        const doesPasswordCorrect = await bcrypt.compare(password, exisitUserDetails.password);

        // if turns out wrong send error
        if (!doesPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: `wrong password`
            })
        }

        // genarate acess token for loggind user
        const jwt_key = process.env.JWT_KEY;
        const accessToken = jwt.sign(

            {
                sub: exisitUserDetails.id,
                paymentStatus: exisitUserDetails.payment,
                songUploadStatus: exisitUserDetails.approvedForSongUpload
            }
            , jwt_key, { expiresIn: '2 h' }
        )

        // genarate refresh token
        const refreshTokenString = randomString({ length: 32, type: 'alphanumeric' });
        const hashedToken = await bcrypt.hash(refreshTokenString, 10);

        // save hased random string value to db
        await prisma.user.update({
            where: { id: exisitUserDetails.id },
            data: { secreateKey: hashedToken }
        })

        // genarate refresh token
        const refreshToken = jwt.sign(
            { token: refreshTokenString },
            jwt_key, { expiresIn: '1w' }
        )

        // return access token along with refresh token
        return res.status(200).json({
            success: true,
            message: `user logged in successfully`,
            accessToken: accessToken,
            refreshToken: refreshToken
        })

    }
}