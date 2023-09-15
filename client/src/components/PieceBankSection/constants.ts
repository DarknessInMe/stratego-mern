import { PieceNameEnum } from 'shared/enums';

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