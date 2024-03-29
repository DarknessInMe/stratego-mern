export enum EnvironmentEnum {
    LAND,
    WATER,
}

export enum PieceNameEnum {
    SPY = 'SPY',
    SCOUT = 'SCOUT',
    MINER = 'MINER',
    SERGEANT = 'SERGEANT',
    LIEUTENANT = 'LIEUTENANT',
    CAPTAIN = 'CAPTAIN',
    MAJOR = 'MAJOR',
    COLONEL = 'COLONEL',
    GENERAL = 'GENERAL',
    MARSHAL = 'MARSHAL',
    BOMB = 'BOMB',
    FLAG = 'FLAG'
}

export enum PieceWeightEnum {
    SPY = 1,
    SCOUT = 2,
    MINER = 3,
    SERGEANT = 4,
    LIEUTENANT = 5,
    CAPTAIN = 6,
    MAJOR = 7,
    COLONEL = 8,
    GENERAL = 9,
    MARSHAL = 10,
    BOMB = 0,
    FLAG = 0,
}

export enum DragTypesEnum {
    PIECE_FROM_BANK = 'PIECE_FROM_BANK',
    PIECE_FROM_BOARD = 'PIECE_FROM_BOARD'
}

export enum GameStages {
    SET_PIECES = 'SET_PIECES',
    READY = 'READY',
    GAME_IN_PROCESS = 'GAME_IN_PROCESS',
};

export enum FightResultEnum {
    STALEMATE = 'STALEMATE',
    VICTORY = 'VICTORY',
    DEFEAT = 'DEFEAT',
}