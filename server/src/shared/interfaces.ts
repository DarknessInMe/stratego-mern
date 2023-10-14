import { UpdatableUserType } from './types';

export interface IUser {
    id: string,
}

export interface ICreateRoomRequest {
    creatorId: string,
}

export interface IJoinRoomRequest {
    roomId: string,
    userId: string,
}

export interface IPlayerRoomRequest {
    payload: UpdatableUserType,
    userId: string,
    roomId: string,
}

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}