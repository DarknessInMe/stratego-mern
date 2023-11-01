import 'module-alias/register';
import { createServer } from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { SocketManager } from '@/ws';

dotenv.config();

const app = express();
const server = createServer(app);
const socketManager = SocketManager.getInstance();

socketManager.init(server);

const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
}));
app.use(express.json());

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});