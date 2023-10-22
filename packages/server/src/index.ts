import 'module-alias/register';
import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import { room } from '@/routes/room';

dotenv.config();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: corsOptions,
});

const port = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use('/room', room);

io.on('connection', () => {
    console.log('A user connected');
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});