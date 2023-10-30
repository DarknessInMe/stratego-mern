import { createServer } from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { BACKEND_SOCKET_EVENTS, FRONTEND_SOCKET_EVENTS, IUser } from '@stratego/common';
import { SessionsManager } from '@/sessions/SessionsManager';

const sessionsManager = SessionsManager.getInstance();

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
            socket.on(BACKEND_SOCKET_EVENTS.CREATE_ROOM, (sessionId: string, userId: string) => {
                socket.join(this.getRoomId(sessionId));
                sessionsManager.sockets.set(socket.id, { sessionId, userId });
            });

            socket.on(BACKEND_SOCKET_EVENTS.UPDATE_USER, (sessionId: string, updatedUser: IUser) => {
                socket.to(this.getRoomId(sessionId)).emit(FRONTEND_SOCKET_EVENTS.ON_USER_UPDATE, updatedUser);
            });

            socket.on(BACKEND_SOCKET_EVENTS.JOIN_USER, (sessionId: string, newUser: IUser) => {
                socket.join(this.getRoomId(sessionId));
                sessionsManager.sockets.set(socket.id, {
                    sessionId,
                    userId: newUser.id,
                });

                socket.to(this.getRoomId(sessionId)).emit(FRONTEND_SOCKET_EVENTS.ON_USER_JOIN, newUser);
            });

            socket.on(BACKEND_SOCKET_EVENTS.KICK_USER, (sessionId: string) => {
                socket.to(this.getRoomId(sessionId)).emit(FRONTEND_SOCKET_EVENTS.ON_USER_KICK);
            });

            socket.on(BACKEND_SOCKET_EVENTS.START_GAME, (sessionId: string) => {
                socket.to(this.getRoomId(sessionId)).emit(FRONTEND_SOCKET_EVENTS.ON_GAME_STARTED);
            });

            socket.on('disconnect', () => {
                const socketData = sessionsManager.sockets.get(socket.id);

                if (!socketData) {
                    return;
                }

                const { sessionId, userId } = socketData;

                try {
                    sessionsManager.sockets.delete(socket.id);
                    sessionsManager.handleLeave(sessionId, userId);
                } catch {
                    //
                } finally {
                    socket.to(this.getRoomId(sessionId)).emit(FRONTEND_SOCKET_EVENTS.ON_USER_LEAVE, userId);
                    socket.leave(this.getRoomId(sessionId));
                }
            });
        });
    }
}