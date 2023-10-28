import express from 'express';
import { SessionsManager } from '@/sessions/SessionsManager';
import { TypedRequestBody } from '@/shared/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { IRoomCreate, IRoomJoin, IRoomUpdatePlayer } from '@stratego/common';
import { SocketManager } from '@/ws';
import { BACKEND_SOCKET_EVENTS } from '@stratego/common';

const { io } = SocketManager.getInstance();
const room = express.Router();
const sessionsManager = SessionsManager.getInstance();

room.post('/create', (req: TypedRequestBody<IRoomCreate>, res) => {
    try {
        const sessionId = uuidv4();
        const createdSession = sessionsManager.createSession(sessionId, req.body.creatorId);

        res.status(201).send(createdSession);
        io?.emit(BACKEND_SOCKET_EVENTS.CREATE_ROOM, sessionId);
    } catch(error) {
        res.status(400).send(error);
    }
});

room.post('/join', (req: TypedRequestBody<IRoomJoin>, res) => {
    try {
        const { roomId, userId } = req.body;
        const session = sessionsManager.join(roomId, userId);

        res.status(200).send(session);
        io?.emit(BACKEND_SOCKET_EVENTS.JOIN_USER, session.id);
    } catch(error) {
        res.status(400).send(error);
    }
});

room.put('/player', (req: TypedRequestBody<IRoomUpdatePlayer>, res) => {
    try {
        const { roomId, userId, payload } = req.body;
        const session = sessionsManager.sessions.get(roomId);

        if (!session) {
            throw new Error(`Session with ${roomId} id doesn't exist`);
        }

        const updatedUser = session.updateUser(userId, payload);
        res.status(200).send(updatedUser);
        io?.emit(BACKEND_SOCKET_EVENTS.UPDATE_USER, updatedUser);
    } catch(error) {
        res.status(400).send(error);
    }
});

room.post('/start', () => {
    // start room
});

export { room };