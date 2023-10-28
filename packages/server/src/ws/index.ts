import { createServer } from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { User } from '@/sessions/User';
import { BACKEND_SOCKET_EVENTS, FRONTEND_SOCKET_EVENTS } from '@stratego/common';

export class SocketManager {
    io: Server | null = null;

    private getRoomId(id: string) {
        return `room:${id}`;
    }

    static instance: SocketManager;

    static getInstance() {
        if (!this.instance) {
            this.instance = new SocketManager();
        }

        return this.instance;
    }

    init(server: ReturnType<typeof createServer>) {
        this.io = new Server(server, {
            cors: {
                origin: [process.env.FRONTEND_URL || '', 'https://admin.socket.io'],
                credentials: true,
            },
        });

        instrument(this.io, {
            auth: false,
            mode: 'development',
        });

        this.io.on('connection', (socket) => {
            socket.on(BACKEND_SOCKET_EVENTS.CREATE_ROOM, (sessionId: string) => {
                socket.join(this.getRoomId(sessionId));
            });

            socket.on(BACKEND_SOCKET_EVENTS.UPDATE_USER, (sessionId: string, updatedUser: User) => {
                socket.to(this.getRoomId(sessionId)).emit(FRONTEND_SOCKET_EVENTS.ON_USER_UPDATE, updatedUser);
            });

            socket.on(BACKEND_SOCKET_EVENTS.JOIN_USER, (sessionId: string, newUser: User) => {
                socket.join(this.getRoomId(sessionId));
                socket.to(this.getRoomId(sessionId)).emit(FRONTEND_SOCKET_EVENTS.ON_USER_JOIN, newUser);
            });
        });
    }
}