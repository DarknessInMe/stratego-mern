import { IUser } from '../shared/interfaces';

export class Session {
    creator: string;
    users: IUser[];

    constructor(creator: IUser) {
        this.creator = creator.id;
        this.users = [creator];
    }
}