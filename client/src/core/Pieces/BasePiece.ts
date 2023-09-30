import { Board } from 'core/Board';
import { EnvironmentEnum, TeamsEnum } from 'shared/enums';
import { ICell, IPieceRank } from 'shared/interfaces';
import { CoordinatesType } from 'shared/types';

export abstract class BasePiece {
    x: number;
    y: number;
    rank: IPieceRank;
    currentAvailablePath: CoordinatesType[] = [];
    team: TeamsEnum;

    constructor(x: number, y: number, rank: IPieceRank, team: TeamsEnum) {
        this.x = x;
        this.y = y;
        this.rank = rank;
        this.team = team;
    }

    abstract initAvailablePath(board: Board): CoordinatesType[]

    canMove(target: ICell) {
        switch(true) {
            case target.environment === EnvironmentEnum.WATER: {
                return false;
            }
            case target.piece?.team === this.team: {
                return false;
            }
            default: {
                return true;
            }
        }
    }

    canBeat(enemyRank: IPieceRank) {
        return this.rank.weight >= enemyRank.weight;
    }

    isCorrectPath(x: number, y: number): boolean {
        return this.currentAvailablePath.some((path) => path.x === x && path.y === y);
    }

    moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.currentAvailablePath = [];
    }
}