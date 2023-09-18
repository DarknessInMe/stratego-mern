import { ICell, IPieceRank } from 'shared/interfaces';
import { BoardFieldType } from 'shared/types';

export abstract class BasePiece {
    x: number;
    y: number;
    rank: IPieceRank;
    currentAvailablePath: ICell[] = [];

    constructor(x: number, y: number, rank: IPieceRank) {
        this.x = x;
        this.y = y;
        this.rank = rank;
    }

    abstract getAvailablePath(board: BoardFieldType): ICell[]

    abstract canBeat(enemyRank: IPieceRank): boolean

    abstract canMove(target: ICell): boolean

    isCorrectPath(x: number, y: number): boolean {
        return this.currentAvailablePath.some((cell) => cell.x === x && cell.y === y);
    }

    moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.currentAvailablePath = [];
    }
}