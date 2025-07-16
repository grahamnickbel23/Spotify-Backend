import mongoose from "mongoose";

const accountloginSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },

    logInTime:{
        type: Date,
        default: Date.now
    },

    logoutTime:{
        type: Date,
        default: Date.now
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

export default mongoose.model("accountloginHistoryModel", accountloginSchema);