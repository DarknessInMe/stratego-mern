import { IPieceRank } from 'shared/interfaces';
import { BasePiece } from './BasePiece';
import { Board } from 'core/Board';
import { TeamsEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';

export class ScoutPiece extends BasePiece {
    constructor(x: number, y: number, rank: IPieceRank, team: TeamsEnum) {
        super(x, y, rank, team);
    }

    private traverseX(board: Board, start: number, modifier: number) {
        const cellX = board.getCell(start + modifier, this.y);

        if (cellX && this.canMove(cellX)) {
            this.currentAvailablePath.push({ x: cellX.x, y: cellX.y });
            !cellX.piece && this.traverseX(board, start + modifier, modifier);
        }
    }

    private traverseY(board: Board, start: number, modifier: number) {
        const cellY = board.getCell(this.x, start + modifier);

        if (cellY && this.canMove(cellY)) {
            this.currentAvailablePath.push({ x: cellY.x, y: cellY.y });
            !cellY.piece && this.traverseY(board, start + modifier, modifier);
        }
    }

    initAvailablePath(board: Board): CoordinatesType[] {
        this.currentAvailablePath = [];

        this.traverseX(board, this.x, 1);
        this.traverseX(board, this.x, -1);
        this.traverseY(board, this.y, 1);
        this.traverseY(board, this.y, -1);

        return this.currentAvailablePath;
    }
}