import { Session } from './Session';
import { IUser, TeamsEnum, UserPayloadType } from '@stratego/common';
import { createUser } from '@/shared/utils';
import { ISocketStore } from '@/shared/interfaces';

export class SessionsManager {
    private static instance: SessionsManager;
    sessions = new Map<string, Session>();
    sockets = new Map<string, ISocketStore>();

    static getInstance() {
        if (!SessionsManager.instance) {
            SessionsManager.instance = new SessionsManager();
        }

        return SessionsManager.instance;
    }

    constructor() {}

    createSession(id: string, creatorId: string) {
        const session = new Session(id, creatorId);

        this.sessions.set(id, session);

        return session;
    }

    join(id: string, newUserId: string) {
        const session = this.sessions.get(id);

        if (!session) {
            throw new Error(`Session with ${id} id doesn't exist`);
        }

        if (session.users.length > 1) {
            throw new Error(`Session with ${id} id is already full`);
        }

        const [opponentUser] = session.users;
        const teamToJoin = opponentUser.team === TeamsEnum.RED_TEAM ? TeamsEnum.BLUE_TEAM : TeamsEnum.RED_TEAM;
        const newUser = createUser(newUserId, teamToJoin)

        session.users.push(newUser);

        return { session, user: newUser };
    }


    updateUser(sessionId: string, userId: string, payload: UserPayloadType) {
        const session = this.sessions.get(sessionId);

        if (!session) {
            throw new Error(`Session with ${sessionId} id doesn't exist`);
        }

        const userIndex = session.users.findIndex(({ id }) => id === userId);

        if (userIndex < 0) {
            throw new Error(`Required user wasn't found`);
        }

        const user = session.users[userIndex];
        let key: keyof UserPayloadType;

        for (key in payload) {
            // idk wtf is that, but it works: https://stackoverflow.com/a/77134454
            user[key] = payload[key] as never;
        }

        session.users[userIndex] = user;

        return user;
    }

    handleLeave(sessionId: string, userId: string) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            console.log(sessionId, userId);
            throw new Error(`Session with ${sessionId} id doesn't exist`);
        }

        if (session.users.length === 1) {
            return this.sessions.delete(sessionId);
        }

        session.users = session.users.filter(({ id }) => id !== userId);
        session.ownerId = session.ownerId === userId ? session.users[0].id : session.ownerId;
    }

    handleKick(sessionId: string, userId: string) {
        const session = this.sessions.get(sessionId);

        if (!session) {
            throw new Error(`Session with ${sessionId} id doesn't exist`);
        }

        session.users = session.users.filter(({ id }) => id !== userId);
    }
}