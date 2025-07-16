import upload from "../controller/audio/multer logic.js";
import songUpload from "../controller/audio/songUpload logic.js";
import { asymcHandeller } from "../utils/asyncHandeller.js";
import express from 'express'

const route = express.Router();

// song upload path
route.post('/upload', upload.fields([
    {name: 'songFile', maxCount: 1},
    {name: 'thumbnail', maxCount: 1}
]), asymcHandeller(songUpload.globalUpload, 'audio upload'));

export default route;