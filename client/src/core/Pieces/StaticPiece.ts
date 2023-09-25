import { ICell, IPieceRank } from 'shared/interfaces';
import { BasePiece } from './BasePiece';

export class StaticPiece extends BasePiece {
    constructor(x: number, y: number, rank: IPieceRank) {
        super(x, y, rank);
    }

    canMove(): boolean {
        return false;
    }

    canBeat(): boolean {
        return false;
    }

    initAvailablePath(): ICell[] {
        return [];
    }
}