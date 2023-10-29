import { TeamsEnum } from './enums';
import { UserPayloadType } from './types'; 

export interface IUser {
    id: string
    isReady: boolean,
    team: TeamsEnum,
}

export interface ISession {
    id: string,
    ownerId: string,
    users: IUser[],
}

export interface IRoomCreate {
    creatorId: string,
}

export interface IRoomJoin {
    roomId: string, 
    userId: string,
}

export interface IJoinRoomResponse {
    session: ISession;
    user: IUser;
}

export interface IRoomUpdatePlayer {
    roomId: string, 
    userId: string,
    payload: UserPayloadType,
}