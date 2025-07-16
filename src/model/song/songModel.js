import mongoose from "mongoose";
import lyricsModel from "./lyricsModel.js";

const songSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },

  lyrics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lyricsModel'
  },

  title: {
    type: String,
    unique: true,
    required: true
  },

  language: {
    type: String,
    required: true
  },

  type: {
    type: String,
    default: "Random"
  },

  singer: {
    type: String,
    default: "not-mentioned"
  },

  otherContribution: {
    type: String,
    default: "not-mentioned"
  },

  musicLabel: {
    type: String,
    default: "not-mentioned"
  },

  albumName: {
    type: String,
    default: "not-mentioned"
  },

  movieName: {
    type: String,
    default: "not-mentioned"
  },

  isPublished: {
    type: Boolean,
    default: true
  },

  views: {
    type: Number,
    default: 0
  },

  likes: {
    type: Number,
    default: 0
  },

  originCountry: String,

  songLength: Number,

  audioLink: String,

  thumbnailLink: String,

  uploadedAudioFormat: String,

  currentAudioFormat: {
    type: String,
    default: '.opus'
  },

  originofAudio: String,

  updatedAt: {
    type: Date,
    default: Date.now
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// insert songid to lyrics model
songSchema.post("save", async function (doc, next) {
  try {
    // abort if no lyrics id is there
    if (!doc.lyrics) {
      return next();
    }
    await lyricsModel.findByIdAndUpdate(
      doc.lyrics,
      { songId: doc._id },
    )
    next();

  } catch { err } {
    return next();
  }
})

export default mongoose.model('songModel', songSchema);