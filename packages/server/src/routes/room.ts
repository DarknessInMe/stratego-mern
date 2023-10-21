import express from 'express';
import { SessionsManager } from '@/sessions/SessionsManager';
import { TypedRequestBody } from '@/shared/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { IRoomCreate, IRoomJoin, IRoomUpdatePlayer } from '@stratego/common';

const room = express.Router();
const sessionsManager = SessionsManager.getInstance();

room.post('/create', (req: TypedRequestBody<IRoomCreate>, res) => {
    try {
        const sessionId = uuidv4();
        const createdSession = sessionsManager.createSession(sessionId, req.body.creatorId);

        res.status(201).send(createdSession);
    } catch(error) {
        res.status(400).send(error);
    }
});

room.post('/join', (req: TypedRequestBody<IRoomJoin>, res) => {
    try {
        const { roomId, userId } = req.body;
        const session = sessionsManager.join(roomId, userId);

        res.status(200).send(session);
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
    } catch(error) {
        res.status(400).send(error);
    }
});

room.post('/start', () => {
    // start room
});

export { room };