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