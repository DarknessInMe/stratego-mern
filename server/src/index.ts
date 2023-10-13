import express from 'express';
import dotenv from 'dotenv';
import { room } from './routes/room';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/room', room);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});