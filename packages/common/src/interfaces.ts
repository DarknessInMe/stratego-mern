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