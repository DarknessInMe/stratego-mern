import { PieceNameEnum } from 'shared/enums';
import { PIECES_SETUP, SESSION_STORAGE_KEYS } from 'shared/constants';
import { RegularPiece, StaticPiece, ScoutPiece } from 'core/Pieces';
import { v4 as uuidv4 } from 'uuid';

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

export const getUserId = () => {
    let userId = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_ID);

    if (userId) {
        return userId;
    }

    userId = uuidv4();

    sessionStorage.setItem(SESSION_STORAGE_KEYS.USER_ID, userId);

    return userId;
};