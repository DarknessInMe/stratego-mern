export interface IUser {
    isReady: boolean,
    team: 0 | 1,
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
    payload: IUser,
}