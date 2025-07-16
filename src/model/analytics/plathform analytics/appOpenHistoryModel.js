import mongoose from "mongoose";

const appOpenHistorySchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },

    deviceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "deviceIdModel"
    },

    appOnTime:{
        type: Date,
        default: Date.now
    },

    appOffTime:{
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
    },

})

export default mongoose.model("appOpeningHistoryModel", appOpenHistorySchema);