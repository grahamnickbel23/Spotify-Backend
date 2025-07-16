import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },

    songs:[{
        songId: mongoose.Schema.Types.ObjectId,
        ref: "songModel",
        added: {type: Date, default: Date.now}
    }],

    shereAble:{
        type: Boolean,
        default: false
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

export default mongoose.model("playlistModel", playlistSchema);