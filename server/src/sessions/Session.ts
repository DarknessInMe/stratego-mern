import { UpdatableUserType } from '../shared/types';
import { User } from './User';

export class Session {
    readonly id: string;
    creator: string;
    users: User[];

    constructor(id: string, creatorId: string) {
        this.id = id;
        this.creator = creatorId;
        this.users = [new User(creatorId)];
    }

    updateUser(userId: string, payload: UpdatableUserType) {
        const user = this.users.find(({ id }) => id === userId);

        if (!user) {
            throw new Error(`Required user wasn't found`);
        }

        user.update(payload);

        return user;
    }
}