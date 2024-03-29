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

export interface IDispositionItem {
    x: number,
    y: number,
    rankName: string,
    id: string,
}

export interface IPieceMovePayload {
    to: {
        x: number,
        y: number,
    },
    id: string,
}