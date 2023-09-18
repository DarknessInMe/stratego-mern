import { PieceNameEnum } from 'shared/enums';
import { PIECES_SETUP } from 'shared/constants';

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