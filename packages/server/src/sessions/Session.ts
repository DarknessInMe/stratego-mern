import { ISession, UserPayloadType, IUser } from '@stratego/common';
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

    updateUser(userId: string, payload: UserPayloadType) {
        const userIndex = this.users.findIndex(({ id }) => id === userId);

        if (userIndex < 0) {
            throw new Error(`Required user wasn't found`);
        }

        const user = this.users[userIndex];
        let key: keyof UserPayloadType;

        for (key in payload) {
            // idk wtf is that, but it works: https://stackoverflow.com/a/77134454
            user[key] = payload[key] as never;
        }

        this.users[userIndex] = user;

        return user;
    }
}