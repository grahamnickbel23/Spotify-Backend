import mongoose from "mongoose";

const likeHistorySchema = new mongoose.Schema({

    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },

    songId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"songModel"
    },

    source:{
        type: String,
        default: "Random"
    }, 

    like: Boolean,

    playlistId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"playlistModel",
        default:null
    },
})

export default mongoose.model('likeHistoryModel', likeHistorySchema);