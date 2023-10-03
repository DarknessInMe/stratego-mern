import { PieceNameEnum } from 'shared/enums';
import { PIECES_SETUP } from 'shared/constants';
import { RegularPiece, StaticPiece, ScoutPiece } from 'core/Pieces';
import { CoordinatesType } from './types';

export const generateInitSetup = (setup: typeof PIECES_SETUP): PieceNameEnum[] => {
    const result: PieceNameEnum[] = [];

    for (const piece in setup) {
        const count = setup[piece];

        for (let i = 0; i < count; i++) {
            result.push(piece as PieceNameEnum);
        }
    }

    return result;
};

export const piecePicker = (rankName: PieceNameEnum): typeof StaticPiece | typeof RegularPiece | typeof ScoutPiece => {
    switch(rankName) {
        case PieceNameEnum.SCOUT:
            return ScoutPiece;
        case PieceNameEnum.BOMB:
        case PieceNameEnum.FLAG:
            return StaticPiece;
        default:
            return RegularPiece;
    }
};

export const isSelectedByPossiblePath = (possiblePath: CoordinatesType[] = [], checkedCoordinates: CoordinatesType) => {
    return possiblePath.some(({ x, y }) => checkedCoordinates.x === x && checkedCoordinates.y === y);
};