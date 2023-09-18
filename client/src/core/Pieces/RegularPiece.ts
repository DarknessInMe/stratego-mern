import { EnvironmentEnum } from 'shared/enums';
import { BasePiece } from './BasePiece';
import { ICell, IPieceRank } from 'shared/interfaces';
import { BoardFieldType } from 'shared/types';

export class RegularPiece extends BasePiece {
    constructor(x: number, y: number, rank: IPieceRank) {
        console.log(rank);
        super(x, y, rank);
    }

    canMove(target: ICell) {
        return target.environment !== EnvironmentEnum.WATER;
    }

    canBeat(enemyRank: IPieceRank) {
        return this.rank.weight >= enemyRank.weight;
    }

    getAvailablePath(board: BoardFieldType): ICell[] {
        const xPositive = board[this.x + 1][this.y];
        const xNegative = board[this.x - 1][this.y];
        const yPositive = board[this.x][this.y + 1];
        const yNegative = board[this.x][this.y - 1];

        if (xPositive && this.canMove(xPositive)) {
            this.currentAvailablePath.push(xPositive);
        }

        if (xNegative && this.canMove(xNegative)) {
            this.currentAvailablePath.push(xNegative);
        }

        if (yPositive && this.canMove(yPositive)) {
            this.currentAvailablePath.push(yPositive);
        }

        if (yNegative && this.canMove(yNegative)) {
            this.currentAvailablePath.push(yNegative);
        }

        return this.currentAvailablePath;
    }
}