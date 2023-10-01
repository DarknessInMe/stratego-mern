import { BasePiece } from './BasePiece';
import { FightResultEnum, PieceNameEnum, TeamsEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';

export class StaticPiece extends BasePiece {
    constructor(x: number, y: number, rankName: PieceNameEnum, team: TeamsEnum) {
        super(x, y, rankName, team);
    }

    canMove(): boolean {
        return false;
    }

    canBeat() {
        return FightResultEnum.DEFEAT;
    }

    initAvailablePath(): CoordinatesType[] {
        return [];
    }
}