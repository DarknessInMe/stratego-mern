import { TeamsEnum } from './enums';

export interface IUser {
    id: string,
    team: TeamsEnum,
}

export interface IUserStatus {
    isLobbyReady: boolean,
    isGameReady: boolean,
}

export interface IUpdateUser {
    status: Partial<IUserStatus>,
    userId: string,
}

export interface ISession {
    id: string,
    ownerId: string,
    users: IUser[],
}