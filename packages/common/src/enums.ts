export enum TeamsEnum {
    RED_TEAM = 'RED_TEAM',
    BLUE_TEAM = 'BLUE_TEAM',
}

export enum BACKEND_SOCKET_EVENTS {
    CREATE_ROOM = 'create-room',
    UPDATE_USER = 'update-user',
    JOIN_USER = 'join-user',
}

export enum FRONTEND_SOCKET_EVENTS {
    ON_USER_UPDATE = 'on-user-update',
    ON_USER_JOIN = 'on-user-join',
}