export interface IUser {
    id: string,
}

export interface ICreateRoomRequest {
    creator: IUser,
}

export interface IJoinRoomRequest {
    roomId: string,
    user: IUser,
}

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}