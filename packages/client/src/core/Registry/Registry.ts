import { TeamsEnum } from '@stratego/common';
import { BasePiece } from 'core/Pieces';
import { PieceNameEnum } from 'shared/enums';

interface IPieces {
    [TeamsEnum.BLUE_TEAM]: Map<string, BasePiece>,
    [TeamsEnum.RED_TEAM]: Map<string, BasePiece>,
}

interface IFlagPieces {
    [TeamsEnum.BLUE_TEAM]: string,
    [TeamsEnum.RED_TEAM]: string,
}

export class Registry {
    pieces: IPieces = {
        [TeamsEnum.BLUE_TEAM]: new Map(),
        [TeamsEnum.RED_TEAM]: new Map(),
    };
    flagPieces: IFlagPieces = {
        [TeamsEnum.BLUE_TEAM]: '',
        [TeamsEnum.RED_TEAM]: '',
    };
    piecesToTeam = new Map<string, TeamsEnum>();

    constructor() {}

    registerPiece(piece: BasePiece) {
        this.piecesToTeam.set(piece.id, piece.team);
        this.pieces[piece.team].set(piece.id, piece);

        if (piece.rankName === PieceNameEnum.FLAG) {
            this.flagPieces[piece.team] = piece.id;
        }
    }

    deletePiece(piece: BasePiece) {
        const team = this.piecesToTeam.get(piece.id);

        this.piecesToTeam.delete(piece.id);
        this.pieces[team].delete(piece.id);

        if (piece.rankName === PieceNameEnum.FLAG) {
            this.flagPieces[piece.team] = '';
        }
    }

    getPieceById(id: string) {
        try {
            const team = this.piecesToTeam.get(id);

            return this.pieces[team].get(id);
        } catch {
            return null;
        }
    }
};