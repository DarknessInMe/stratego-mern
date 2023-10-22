import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : process.env.BACKEND_URL;

export const socket = io(URL, {
    autoConnect: false,
});