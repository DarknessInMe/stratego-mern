import { BasePiece } from './BasePiece';
import { IPieceRank } from 'shared/interfaces';
import { Board } from 'core/Board';
import { TeamsEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';

export class RegularPiece extends BasePiece {
    constructor(x: number, y: number, rank: IPieceRank, team: TeamsEnum) {
        super(x, y, rank, team);
    }

    initAvailablePath(board: Board): CoordinatesType[] {
        this.currentAvailablePath = [];
        
        const xPositive = board.getCell(this.x + 1, this.y);
        const xNegative = board.getCell(this.x - 1, this.y);
        const yPositive = board.getCell(this.x, this.y + 1);
        const yNegative = board.getCell(this.x, this.y - 1);

        if (xPositive && this.canMove(xPositive)) {
            this.currentAvailablePath.push({ x: xPositive.x, y: xPositive.y });
        }

        if (xNegative && this.canMove(xNegative)) {
            this.currentAvailablePath.push({ x: xNegative.x, y: xNegative.y });
        }

        if (yPositive && this.canMove(yPositive)) {
            this.currentAvailablePath.push({ x: yPositive.x, y: yPositive.y });
        }

        if (yNegative && this.canMove(yNegative)) {
            this.currentAvailablePath.push({ x: yNegative.x, y: yNegative.y });
        }

        return this.currentAvailablePath;
    }
}