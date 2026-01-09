import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import attendanceRoutes from './routes/attendanceRoutes.js';
import absentRoutes from './routes/absentRoutes.js';
import cancelRoutes from './routes/cancelRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/', attendanceRoutes);
app.use('/absent', absentRoutes);
app.use('/cancel', cancelRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});