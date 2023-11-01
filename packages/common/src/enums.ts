export enum TeamsEnum {
    RED_TEAM = 'RED_TEAM',
    BLUE_TEAM = 'BLUE_TEAM',
}

export enum REQUEST_EVENTS {
    CREATE_ROOM = 'create-room',
    UPDATE_USER = 'update-user',
    JOIN_USER = 'join-user',
    KICK_USER = 'kick-user',
    START_GAME = 'start-game'
}

export enum RESPONSE_EVENTS {
    ON_USER_UPDATE = 'on-user-update',
    ON_USER_JOIN = 'on-user-join',
    ON_USER_LEAVE = 'on-user-leave',
    ON_USER_KICK = 'on-user-kick',
    ON_GAME_STARTED = 'on-game-started',
}

export enum REQ_HEADERS {
    USER_ID = 'userId',
    SESSION_ID = 'sessionId',
}