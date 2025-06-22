import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from "./config/db.js";
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sample-deploy-client.onrender.com'
  ]
}));

app.use('/api',authRoute);

app.listen(PORT,()=> {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
});
