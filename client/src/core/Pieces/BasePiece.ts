import { PieceEnum } from 'shared/enums';
import { ICell } from 'shared/interfaces';
import { BoardFieldType } from 'shared/types';

export abstract class BasePiece {
    x: number;
    y: number;
    rank: PieceEnum;
    currentAvailablePath: ICell[] = [];

    constructor(x: number, y: number, rank: PieceEnum) {
        this.x = x;
        this.y = y;
        this.rank = rank;
    }

    abstract getAvailablePath(board: BoardFieldType): ICell[]

    abstract canBeat(enemyRank: PieceEnum): boolean

    abstract canMove(target: ICell): boolean

    moveTo(x: number, y: number): boolean {
        const isCorrectPath = this.currentAvailablePath.some((cell) => cell.x === x && cell.y === y);

        if (!isCorrectPath) {
            return false;
        }

        this.x = x;
        this.y = y;
        this.currentAvailablePath = [];
    }
}