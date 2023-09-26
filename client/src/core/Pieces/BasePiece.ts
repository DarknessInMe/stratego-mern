import { Board } from 'core/Board';
import { EnvironmentEnum, TeamsEnum } from 'shared/enums';
import { ICell, IPieceRank } from 'shared/interfaces';

export abstract class BasePiece {
    x: number;
    y: number;
    rank: IPieceRank;
    currentAvailablePath: ICell[] = [];
    team: TeamsEnum;

    constructor(x: number, y: number, rank: IPieceRank, team: TeamsEnum) {
        this.x = x;
        this.y = y;
        this.rank = rank;
        this.team = team;
    }

    abstract initAvailablePath(board: Board): ICell[]

    canMove(target: ICell) {
        return target.environment !== EnvironmentEnum.WATER;
    }

    canBeat(enemyRank: IPieceRank) {
        return this.rank.weight >= enemyRank.weight;
    }

    isCorrectPath(x: number, y: number): boolean {
        return this.currentAvailablePath.some((cell) => cell.x === x && cell.y === y);
    }

    moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.currentAvailablePath = [];
    }
}