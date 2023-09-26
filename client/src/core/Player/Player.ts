import { PieceNameEnum, TeamsEnum } from 'shared/enums';
import { IPlayer } from 'shared/interfaces';

export class Player implements IPlayer {
    team: TeamsEnum;
    defeatedPieces: Record<PieceNameEnum, number> = {
        [PieceNameEnum.MARSHAL]: 0,
        [PieceNameEnum.GENERAL]: 0,
        [PieceNameEnum.COLONEL]: 0,
        [PieceNameEnum.MAJOR]: 0,
        [PieceNameEnum.CAPTAIN]: 0,
        [PieceNameEnum.LIEUTENANT]: 0,
        [PieceNameEnum.SERGEANT]: 0,
        [PieceNameEnum.MINER]: 0,
        [PieceNameEnum.SCOUT]: 0,
        [PieceNameEnum.SPY]: 0,
        [PieceNameEnum.BOMB]: 0,
        [PieceNameEnum.FLAG]: 0,
    };

    constructor(team: TeamsEnum) {
        this.team = team;
    }

    countDefeatedPieces(rankName: PieceNameEnum) {
        this.defeatedPieces[rankName] += 1;
    }
}