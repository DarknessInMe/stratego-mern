import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { IDispositionItem, IUpdateUser, IUserStatus, REQUEST_EVENTS, RESPONSE_EVENTS } from '@stratego/common';
import { SessionsManager } from '@/sessions/SessionsManager';
import { REQ_HEADERS } from '@stratego/common';

const sessionsManager = SessionsManager.getInstance();

export class SocketManager {
    io: Server | null = null;

    static instance: SocketManager;

    static getInstance() {
        if (!this.instance) {
            this.instance = new SocketManager();
        }

        return this.instance;
    }

    private extractHeaders(socket: Socket) {
        return {
            userId: socket.handshake.auth[REQ_HEADERS.USER_ID],
            sessionId: socket.handshake.auth[REQ_HEADERS.SESSION_ID],
        };
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
            socket.on(REQUEST_EVENTS.CREATE_ROOM, (respond) => {
                try {
                    const { sessionId } = this.extractHeaders(socket);
                    const createdSession = sessionsManager.createSession(sessionId, socket.handshake.auth.userId);
    
                    socket.join(sessionId);
                    respond(createdSession);
                } catch {
                    respond(null);
                }
            });

            socket.on(REQUEST_EVENTS.UPDATE_USER, (updatePayload: Partial<IUserStatus>, respond) => {
                try {
                    const { sessionId, userId } = this.extractHeaders(socket);
                    const response: IUpdateUser = {
                        userId,
                        status: updatePayload,
                    };

                    socket.broadcast.to(sessionId).emit(RESPONSE_EVENTS.ON_USER_UPDATE, response);
                    respond(response);
                } catch {
                    respond(null);
                }
            });

            socket.on(REQUEST_EVENTS.JOIN_USER, (respond) => {
                try {
                    const { sessionId, userId } = this.extractHeaders(socket);
                    const { session, user } = sessionsManager.join(sessionId, userId);
                    
                    socket.join(sessionId);
                    socket.to(sessionId).emit(RESPONSE_EVENTS.ON_USER_JOIN, user);
                    respond(session);
                } catch {
                    respond(null);
                }
            });

            socket.on(REQUEST_EVENTS.KICK_USER, (respond) => {
                try {
                    const { sessionId, userId } = this.extractHeaders(socket);
                    const session = sessionsManager.sessions.get(sessionId);
    
                    if (session?.ownerId !== userId) {
                        return respond(false);
                    }
    
                    socket.to(sessionId).emit(RESPONSE_EVENTS.ON_USER_KICK);
                    respond(true);
                } catch {
                    respond(null);
                }
            });

            socket.on(REQUEST_EVENTS.START_GAME, (respond) => {
                try {
                    const { sessionId, userId } = this.extractHeaders(socket);
                    const session = sessionsManager.sessions.get(sessionId);
    
                    if (session?.ownerId !== userId) {
                        return respond(false);
                    }
    
                    socket.to(sessionId).emit(RESPONSE_EVENTS.ON_GAME_STARTED);
                    respond(true);
                } catch {
                    respond(null);
                }
            });

            socket.on(REQUEST_EVENTS.SEND_DISPOSITION, (payload: IDispositionItem[]) => {
                try {
                    const { sessionId } = this.extractHeaders(socket);

                    socket.to(sessionId).emit(RESPONSE_EVENTS.ON_DISPOSITION_RECEIVED, payload);
                } catch {
                    //
                }
            });

            socket.on('disconnect', () => {
                const { sessionId, userId } = this.extractHeaders(socket);

                try {
                    sessionsManager.handleLeave(sessionId, userId);
                } catch {
                    //
                } finally {
                    socket.to(sessionId).emit(RESPONSE_EVENTS.ON_USER_LEAVE, userId);
                    socket.leave(sessionId);
                }
            });
        });
    }
}