import { User } from './User';
import { ISession, IBaseUser } from '../../../common/index';

export class Session implements ISession{
    readonly id: string;
    ownerId: string;
    users: User[];

    constructor(id: string, creatorId: string) {
        this.id = id;
        this.ownerId = creatorId;
        this.users = [new User(creatorId)];
    }

    updateUser(userId: string, payload: IBaseUser) {
        const user = this.users.find(({ id }) => id === userId);

        if (!user) {
            throw new Error(`Required user wasn't found`);
        }

        user.update(payload);

        return user;
    }
}