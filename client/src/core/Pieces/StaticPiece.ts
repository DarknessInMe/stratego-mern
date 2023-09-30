import { IPieceRank } from 'shared/interfaces';
import { BasePiece } from './BasePiece';
import { TeamsEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';

export class StaticPiece extends BasePiece {
    constructor(x: number, y: number, rank: IPieceRank, team: TeamsEnum) {
        super(x, y, rank, team);
    }

    canMove(): boolean {
        return false;
    }

    canBeat(): boolean {
        return false;
    }

    initAvailablePath(): CoordinatesType[] {
        return [];
    }
}