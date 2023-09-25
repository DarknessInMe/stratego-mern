import { EnvironmentEnum } from 'shared/enums';
import { BasePiece } from './BasePiece';
import { ICell, IPieceRank } from 'shared/interfaces';
import { Board } from 'core/Board';

export class RegularPiece extends BasePiece {
    constructor(x: number, y: number, rank: IPieceRank) {
        super(x, y, rank);
    }

    canMove(target: ICell) {
        return target.environment !== EnvironmentEnum.WATER;
    }

    canBeat(enemyRank: IPieceRank) {
        return this.rank.weight >= enemyRank.weight;
    }

    initAvailablePath(board: Board): ICell[] {
        const xPositive = board.getCell(this.x + 1, this.y);
        const xNegative = board.getCell(this.x - 1, this.y);
        const yPositive = board.getCell(this.x, this.y + 1);
        const yNegative = board.getCell(this.x, this.y - 1);

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