import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        unique: true
    },

    username:{
        type: String,
    },

    updatedAt:{
        type: Date,
        default: Date.now
    },

    createdAt:{
        type: Date,
        default: Date.now
    }

})

export default mongoose.model("userModel", userSchema);