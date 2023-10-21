import { TeamsEnum } from './enums';

export interface IBaseUser {
    isReady: boolean,
    team: TeamsEnum,
}

export interface IUserEntity extends IBaseUser {
    id: string
}

export interface ISession {
    id: string,
    ownerId: string,
    users: IUserEntity[],
}

export interface IRoomCreate {
    creatorId: string,
}

export interface IRoomJoin {
    roomId: string, 
    userId: string,
}

export interface IRoomUpdatePlayer {
    roomId: string, 
    userId: string,
    payload: IBaseUser,
}