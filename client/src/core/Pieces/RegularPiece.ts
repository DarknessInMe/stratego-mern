import { BasePiece } from './BasePiece';
import { Board } from 'core/Board';
import { PieceNameEnum, TeamsEnum, FightResultEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';

export class RegularPiece extends BasePiece {
    constructor(x: number, y: number, rankName: PieceNameEnum, team: TeamsEnum) {
        super(x, y, rankName, team);
    }

    canBeat(enemyRank: PieceNameEnum) {
        if (this.rankName === PieceNameEnum.MINER && enemyRank === PieceNameEnum.BOMB) {
            return FightResultEnum.VICTORY;
        }

        if (this.rankName === PieceNameEnum.SPY && enemyRank === PieceNameEnum.MARSHAL) {
            return FightResultEnum.VICTORY;
        }

        return super.canBeat(enemyRank);
    }

    initAvailablePath(board: Board): CoordinatesType[] {
        this.currentAvailablePath = [];
        
        const xPositive = board.getCell(this.x + 1, this.y);
        const xNegative = board.getCell(this.x - 1, this.y);
        const yPositive = board.getCell(this.x, this.y + 1);
        const yNegative = board.getCell(this.x, this.y - 1);

        if (xPositive && this.canMove(xPositive, board)) {
            this.currentAvailablePath.push({ x: xPositive.x, y: xPositive.y });
        }

        if (xNegative && this.canMove(xNegative, board)) {
            this.currentAvailablePath.push({ x: xNegative.x, y: xNegative.y });
        }

        if (yPositive && this.canMove(yPositive, board)) {
            this.currentAvailablePath.push({ x: yPositive.x, y: yPositive.y });
        }

        if (yNegative && this.canMove(yNegative, board)) {
            this.currentAvailablePath.push({ x: yNegative.x, y: yNegative.y });
        }

        return this.currentAvailablePath;
    }
}