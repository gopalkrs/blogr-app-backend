import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
configDotenv(); // To use .env file

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
  origin: 'https://bloggr-app.vercel.app/', // Allow only frontend's URL
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection failed.', err));

