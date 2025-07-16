import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import audioUpload from './src/routes/audio route.js';
import connectDB from './connectMongoDB.js';
import { awsS3Connect } from './connectAWS.js'; // ✅ renamed import
import path from 'path';

dotenv.config();

const port = process.env.PORT || 6000;

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// connect mongo
connectDB();

// ✅ AWS connect test log (optional)
awsS3Connect();

// routes
app.use('/song', audioUpload);

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});