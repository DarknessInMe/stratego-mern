import { ISession, IUser } from '@stratego/common';
import { createUser } from '@/shared/utils';

export class Session implements ISession {
    readonly id: string;
    ownerId: string;
    users: IUser[] = [];

    constructor(id: string, creatorId: string) {
        this.id = id;
        this.ownerId = creatorId;
        this.users.push(createUser(creatorId));
    }
}