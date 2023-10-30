export enum TeamsEnum {
    RED_TEAM = 'RED_TEAM',
    BLUE_TEAM = 'BLUE_TEAM',
}

export enum BACKEND_SOCKET_EVENTS {
    CREATE_ROOM = 'create-room',
    UPDATE_USER = 'update-user',
    JOIN_USER = 'join-user',
    KICK_USER = 'kick-user',
    START_GAME = 'start-game'
}

export enum FRONTEND_SOCKET_EVENTS {
    ON_USER_UPDATE = 'on-user-update',
    ON_USER_JOIN = 'on-user-join',
    ON_USER_LEAVE = 'on-user-leave',
    ON_USER_KICK = 'on-user-kick',
    ON_GAME_STARTED = 'on-game-started',
}