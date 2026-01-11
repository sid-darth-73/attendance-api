import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import attendanceRoutes from './routes/attendanceRoutes.js';
import absentRoutes from './routes/absentRoutes.js';
import cancelRoutes from './routes/cancelRoutes.js';
import extraRoutes from './routes/extraRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",                
  "http://localhost:3002",            
  "https://sid-darth-73.github.io"   
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps or curl requests)
    if(!origin) return callback(null, true);
    
    if(allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/', attendanceRoutes);
app.use('/absent', absentRoutes);
app.use('/cancel', cancelRoutes);
app.use('/extra', extraRoutes);


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});