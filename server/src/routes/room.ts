import express from 'express';
import { SessionsManager } from '../sessions/SessionsManager';
import { TypedRequestBody, ICreateRoomRequest, IJoinRoomRequest } from '../shared/interfaces';
import { v4 as uuidv4 } from 'uuid';

const room = express.Router();
const sessionsManager = SessionsManager.getInstance();

room.post('/create', (req: TypedRequestBody<ICreateRoomRequest>, res) => {
    try {
        const sessionId = uuidv4();

        sessionsManager.createSession(sessionId, req.body.creator);
        res.status(200).send(sessionId);
    } catch(error) {
        res.status(400).send(error);
    }
});

room.post('/join', (req: TypedRequestBody<IJoinRoomRequest>, res) => {
    try {
        const { roomId, user } = req.body;

        sessionsManager.join(roomId, user);
        res.status(200).send(roomId);
    } catch(error) {
        res.status(400).send(error);
    }
});

room.put('/player-status', () => {
    // make ready/unready
});

room.post('/start', () => {
    // start room
});

export { room };