import { BasePiece } from './BasePiece';
import { FightResultEnum, PieceNameEnum } from 'shared/enums';
import { TeamsEnum } from '@stratego/common';
import { CoordinatesType } from 'shared/types';

export class StaticPiece extends BasePiece {
    constructor(
        x: number, 
        y: number, 
        rankName: PieceNameEnum, 
        team: TeamsEnum,
        id?: string
    ) {
        super(x, y, rankName, team, id);
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