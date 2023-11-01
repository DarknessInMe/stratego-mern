import { getUserId } from 'shared/utils';
import { Socket, io } from 'socket.io-client';
import { ISession, IUser, REQUEST_EVENTS, REQ_HEADERS, UserPayloadType } from '@stratego/common';
import { NullableType } from 'shared/types';

const URL = process.env.NODE_ENV === 'production' ? undefined : process.env.BACKEND_URL;

class SocketManager {
    root: Socket;

    constructor() {
        this.root = io(URL, {
            autoConnect: false,
            auth: {
                [REQ_HEADERS.USER_ID]: getUserId(),
                [REQ_HEADERS.SESSION_ID]: '',
            }
        });
    }

    connect(sessionId: string) {
        this.root.auth[REQ_HEADERS.SESSION_ID] = sessionId;
        this.root.connect();
    }

    disconnect() {
        this.root.auth[REQ_HEADERS.SESSION_ID] = '';
        this.root.disconnect();
    }

    async createRoom(): Promise<NullableType<ISession>> {
        return await this.root.emitWithAck(REQUEST_EVENTS.CREATE_ROOM);
    }

    async joinRoom(): Promise<NullableType<ISession>> {
        return await this.root.emitWithAck(REQUEST_EVENTS.JOIN_USER);
    }

    async updateUser(payload: UserPayloadType): Promise<NullableType<IUser>> {
        return await this.root.emitWithAck(REQUEST_EVENTS.UPDATE_USER, payload);
    }

    async kickUser(): Promise<boolean> {
        return await this.root.emitWithAck(REQUEST_EVENTS.KICK_USER);
    }

    async startGame(): Promise<boolean> {
        return await this.root.emitWithAck(REQUEST_EVENTS.START_GAME);
    }
}

export const socket = new SocketManager();