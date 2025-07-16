import mongoose from "mongoose";

export default async function connectDB(){
    try{

        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Database connected`);

    }catch (err){

        console.log(`MongoDB database connection Error: ${err}`);
        
    }
}