import mongoose from "mongoose";

const lyricsSchema = new mongoose.Schema({

    songId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "songModel"
    },

    lyrics:String,

    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"userModel"
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

export default mongoose.model("lyricsModel", lyricsSchema);