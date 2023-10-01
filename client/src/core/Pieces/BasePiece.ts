import { Board } from 'core/Board';
import { EnvironmentEnum, PieceNameEnum, TeamsEnum, PieceWeightEnum } from 'shared/enums';
import { ICell } from 'shared/interfaces';
import { CoordinatesType } from 'shared/types';
import { PIECES } from 'shared/constants';
import { v4 as uuidv4 } from 'uuid';

export abstract class BasePiece {
    x: number;
    y: number;
    currentAvailablePath: CoordinatesType[] = [];

    readonly id: string;
    readonly rankName: PieceNameEnum;
    readonly weight: PieceWeightEnum;
    readonly team: TeamsEnum;

    constructor(x: number, y: number, rankName: PieceNameEnum, team: TeamsEnum) {
        this.x = x;
        this.y = y;
        this.rankName = rankName;
        this.weight = this.getPieceWeightByRank(rankName);
        this.team = team;
        this.id = uuidv4();
    }

    abstract initAvailablePath(board: Board): CoordinatesType[]

    protected getPieceWeightByRank(rank: PieceNameEnum): PieceWeightEnum {
        return PIECES[rank];
    }

    canMove(target: ICell, board: Board) {
        const targetPiece = board.getPieceById(target.pieceId);

        if (targetPiece?.team === this.team) {
            return false;
        }

        if (target.environment === EnvironmentEnum.WATER) {
            return false;

        }

        return true;
    }

    canBeat(enemyRank: PieceNameEnum) {
        const enemyWeight = this.getPieceWeightByRank(enemyRank);

        return this.weight >= enemyWeight;
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