import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';
configDotenv(); // To use .env file

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
  origin: 'http://localhost:5173', // Allow only frontend's URL
}));
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection failed.', err));

