import { IUser } from '../shared/interfaces';
import { Session } from './Session';

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

    createSession(id: string, creator: IUser) {
        if (this.sessions.has(id)) {
            throw new Error(`Session with ${id} id is already exist`);
        }

        this.sessions.set(id, new Session(creator));
    }

    join(id: string, newUser: IUser) {
        const session = this.sessions.get(id);

        if (!session) {
            throw new Error(`Session with ${id} id doesn't exist`);
        }

        if (session.users.length > 1) {
            throw new Error(`Session with ${id} id is already full`);
        }

        session.users.push(newUser);
    }
}