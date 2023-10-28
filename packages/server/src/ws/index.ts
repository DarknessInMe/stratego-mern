import { createServer } from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { User } from '@/sessions/User';
import { BACKEND_SOCKET_EVENTS, FRONTEND_SOCKET_EVENTS } from '@stratego/common';

interface IContext {
    roomId: string
}

export class SocketManager {
    public io: Server | null = null;
    private context: IContext = {
        roomId: '',
    };

    private getRoomId() {
        return `room:${this.context.roomId}`;
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
            socket.onAny((eventName) => {
                console.log(`${eventName} fired!`);
            });

            socket.on(BACKEND_SOCKET_EVENTS.CREATE_ROOM, (sessionId: string) => {
                this.context.roomId = sessionId;

                socket.join(this.getRoomId());
            });

            socket.on(BACKEND_SOCKET_EVENTS.UPDATE_USER, (updatedUser: User) => {
                socket.to(this.getRoomId()).emit(FRONTEND_SOCKET_EVENTS.ON_USER_UPDATE, updatedUser);
            });

            socket.on(BACKEND_SOCKET_EVENTS.JOIN_USER, (newUser: User, sessionId: string) => {
                this.context.roomId = sessionId;

                socket.join(this.getRoomId());
                socket.to(this.getRoomId()).emit(FRONTEND_SOCKET_EVENTS.ON_USER_JOIN, newUser);
            });
        });
    }
}