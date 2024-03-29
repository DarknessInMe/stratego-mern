import { Session } from './Session';
import { TeamsEnum } from '@stratego/common';
import { createUser } from '@/shared/utils';

export class SessionsManager {
    private static instance: SessionsManager;
    sessions = new Map<string, Session>();

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
        const newUser = createUser(newUserId, teamToJoin);

        session.users.push(newUser);

        return { session, user: newUser };
    }

    handleLeave(sessionId: string, userId: string) {
        const session = this.sessions.get(sessionId);
        if (!session) {
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