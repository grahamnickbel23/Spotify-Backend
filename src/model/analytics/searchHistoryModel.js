import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },

    query:String,

    answer:[{
        songId:{type: mongoose.Schema.Types.ObjectId, ref: "songModel"},
        positiong: String,
        source: {type: String, default: "Random"},
        playlistId:{type: mongoose.Schema.Types.ObjectId, ref:"playlistModel", default:null}
    }],

    createdAt:{type: Date, default:Date.now}
})

export default mongoose.model('searchHistoryModel', searchHistorySchema);