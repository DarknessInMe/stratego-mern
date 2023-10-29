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

export interface IUserOperation {
    roomId: string, 
    userId: string,
}

export interface IRoomCreate {
    creatorId: string,
}

export interface IRoomJoin extends IUserOperation {}

export interface IRoomKick extends IUserOperation {}

export interface IJoinRoomResponse {
    session: ISession;
    user: IUser;
}

export interface IRoomUpdatePlayer extends IUserOperation {
    payload: UserPayloadType,
}