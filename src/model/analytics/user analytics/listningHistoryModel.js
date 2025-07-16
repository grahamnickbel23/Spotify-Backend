import mongoose from "mongoose";

const listningHistorySchema = new mongoose.Schema({

    songId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "songModel"
},

    userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "userModel"
},

    source: {
    type:String, 
    default: "random"
},

    playlist:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "playlistModel", default: null
},

    listningAt: {type: Date, default:Date.now}
})

export default mongoose.model('listningHistoryModel', listningHistorySchema);