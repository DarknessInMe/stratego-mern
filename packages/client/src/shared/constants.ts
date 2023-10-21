import { PieceNameEnum, PieceWeightEnum } from './enums';

export const PIECES = {
    [PieceNameEnum.SPY]: PieceWeightEnum.SPY,
    [PieceNameEnum.SCOUT]: PieceWeightEnum.SCOUT,
    [PieceNameEnum.MINER]: PieceWeightEnum.MINER,
    [PieceNameEnum.SERGEANT]: PieceWeightEnum.SERGEANT,
    [PieceNameEnum.LIEUTENANT]: PieceWeightEnum.LIEUTENANT,
    [PieceNameEnum.CAPTAIN]: PieceWeightEnum.CAPTAIN,
    [PieceNameEnum.MAJOR]: PieceWeightEnum.MAJOR,
    [PieceNameEnum.COLONEL]: PieceWeightEnum.COLONEL,
    [PieceNameEnum.GENERAL]: PieceWeightEnum.GENERAL,
    [PieceNameEnum.MARSHAL]: PieceWeightEnum.MARSHAL,
    [PieceNameEnum.BOMB]: PieceWeightEnum.BOMB,
    [PieceNameEnum.FLAG]: PieceWeightEnum.FLAG,
} as const;

export const PIECES_SETUP: Record<PieceNameEnum, number> = {
    [PieceNameEnum.MARSHAL]: 1,
    [PieceNameEnum.GENERAL]: 1,
    [PieceNameEnum.COLONEL]: 2,
    [PieceNameEnum.MAJOR]: 3,
    [PieceNameEnum.CAPTAIN]: 4,
    [PieceNameEnum.LIEUTENANT]: 4,
    [PieceNameEnum.SERGEANT]: 4,
    [PieceNameEnum.MINER]: 5,
    [PieceNameEnum.SCOUT]: 8,
    [PieceNameEnum.SPY]: 1,
    [PieceNameEnum.BOMB]: 6,
    [PieceNameEnum.FLAG]: 1,
};

export const CELL_ATTRIBUTES = {
    X: 'data-x',
    Y: 'data-y',
} as const;

export const SESSION_STORAGE_KEYS = {
    USER_ID: 'USER_ID',
} as const;