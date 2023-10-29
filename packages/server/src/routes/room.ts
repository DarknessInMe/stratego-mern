import express from 'express';
import { SessionsManager } from '@/sessions/SessionsManager';
import { TypedRequestBody } from '@/shared/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { IRoomCreate, IRoomJoin, IRoomKick, IRoomUpdatePlayer } from '@stratego/common';

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
        const payload = sessionsManager.join(roomId, userId);

        res.status(200).send(payload);
    } catch(error) {
        res.status(400).send(error);
    }
});

room.put('/player', (req: TypedRequestBody<IRoomUpdatePlayer>, res) => {
    try {
        const { roomId, userId, payload } = req.body;
        const updatedUser = sessionsManager.updateUser(roomId, userId, payload);
        
        res.status(200).send(updatedUser);
    } catch(error) {
        res.status(400).send(error);
    }
});

// TODO: Implement checking is owner made this action
room.post('/kick', (req: TypedRequestBody<IRoomKick>, res) => {
    try {
        const { roomId, userId } = req.body;
        console.log(roomId);
        sessionsManager.handleKick(roomId, userId);

        res.status(200).send(true);
    } catch(error) {
        res.status(400).send(error);
    }
});

room.post('/start', () => {
    // start room
});

export { room };