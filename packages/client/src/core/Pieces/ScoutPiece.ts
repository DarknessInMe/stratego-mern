import { BasePiece } from './BasePiece';
import { Board } from 'core/Board';
import { PieceNameEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';
import { TeamsEnum } from '@stratego/common';

export class ScoutPiece extends BasePiece {
    constructor(x: number, y: number, rankName: PieceNameEnum, team: TeamsEnum) {
        super(x, y, rankName, team);
    }

    private traverseX(board: Board, start: number, modifier: number) {
        const cellX = board.getCell(start + modifier, this.y);

        if (cellX && this.canMove(cellX, board)) {
            this.currentAvailablePath.push({ x: cellX.x, y: cellX.y });
            !cellX.pieceId && this.traverseX(board, start + modifier, modifier);
        }
    }

    private traverseY(board: Board, start: number, modifier: number) {
        const cellY = board.getCell(this.x, start + modifier);

        if (cellY && this.canMove(cellY, board)) {
            this.currentAvailablePath.push({ x: cellY.x, y: cellY.y });
            !cellY.pieceId && this.traverseY(board, start + modifier, modifier);
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