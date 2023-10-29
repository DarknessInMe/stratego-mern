export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export interface ISocketStore {
    sessionId: string,
    userId: string,
}