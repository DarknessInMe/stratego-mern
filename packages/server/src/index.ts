import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { room } from '@/routes/room';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: process.env.FRONTEND_URL,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/room', room);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});