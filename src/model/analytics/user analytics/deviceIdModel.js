import mongoose from "mongoose";

const deviceIdSchema = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userId'
  },

  playlist:[{
    playlistId:{ type: mongoose.Schema.Types.ObjectId, ref: "playlistModel"},
    added: {type: Date, default: Date.now}
  }],

  deviceId:[{
    deviceId: String,
    deviceType: {type: String, default: "mobile"},
    added: {type: Date, default: Date.now},
    deleted:{type: Date, default: null}
  }],

  updatedAt:{type: Date, default: Date.now},

  createdAt:{type: Date, default:Date.now},
})

export default mongoose.model('deviceIdModel', deviceIdSchema);