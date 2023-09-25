import { ICell, IPieceRank } from 'shared/interfaces';
import { BasePiece } from './BasePiece';
import { Board } from 'core/Board';

export class ScoutPiece extends BasePiece {
    constructor(x: number, y: number, rank: IPieceRank) {
        super(x, y, rank);
    }

    private traverseX(board: Board, start: number, modifier: number) {
        const cellX = board.getCell(start + modifier, this.y);

        if (cellX && this.canMove(cellX)) {
            this.currentAvailablePath.push(cellX);
            !cellX.piece && this.traverseX(board, start + modifier, modifier);
        }
    }

    private traverseY(board: Board, start: number, modifier: number) {
        const cellY = board.getCell(this.x, start + modifier);

        if (cellY && this.canMove(cellY)) {
            this.currentAvailablePath.push(cellY);
            !cellY.piece && this.traverseY(board, start + modifier, modifier);
        }
    }

    initAvailablePath(board: Board): ICell[] {
        this.currentAvailablePath = [];

        this.traverseX(board, this.x, 1);
        this.traverseX(board, this.x, -1);
        this.traverseY(board, this.y, 1);
        this.traverseY(board, this.y, -1);

        return this.currentAvailablePath;
    }
}