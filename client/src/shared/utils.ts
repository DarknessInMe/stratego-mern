import { PieceNameEnum } from 'shared/enums';
import { PIECES_SETUP } from 'shared/constants';

export const generateInitSetup = (): PieceNameEnum[] => {
    const setup: PieceNameEnum[] = [];

    for (const piece in PIECES_SETUP) {
        const count = PIECES_SETUP[piece];

        for (let i = 0; i < count; i++) {
            setup.push(piece as PieceNameEnum);
        }
    }

    return setup;
};