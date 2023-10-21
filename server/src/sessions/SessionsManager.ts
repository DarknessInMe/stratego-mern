import { Session } from './Session';
import { User } from './User';
import { TeamsEnum } from '../../../common/index';

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

    join(id: string, userId: string) {
        const session = this.sessions.get(id);

        if (!session) {
            throw new Error(`Session with ${id} id doesn't exist`);
        }

        if (session.users.length > 1) {
            throw new Error(`Session with ${id} id is already full`);
        }

        const opponentTeam = session.users[0].team;
        const newUser = new User(userId, opponentTeam === TeamsEnum.RED_TEAM ? TeamsEnum.BLUE_TEAM : TeamsEnum.RED_TEAM);

        session.users.push(newUser);

        return session;
    }
}