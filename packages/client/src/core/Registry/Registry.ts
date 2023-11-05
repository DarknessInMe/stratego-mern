import { TeamsEnum } from '@stratego/common';
import { BasePiece } from 'core/Pieces';

interface IPieces {
    [TeamsEnum.BLUE_TEAM]: Map<string, BasePiece>,
    [TeamsEnum.RED_TEAM]: Map<string, BasePiece>,
}

export class Registry {
    pieces: IPieces = {
        [TeamsEnum.BLUE_TEAM]: new Map(),
        [TeamsEnum.RED_TEAM]: new Map(),
    };
    piecesToTeam = new Map<string, TeamsEnum>();

    constructor() {}

    registerPiece(piece: BasePiece) {
        this.piecesToTeam.set(piece.id, piece.team);
        this.pieces[piece.team].set(piece.id, piece);
    }

    deletePiece(piece: BasePiece) {
        const team = this.piecesToTeam.get(piece.id);

        this.piecesToTeam.delete(piece.id);
        this.pieces[team].delete(piece.id);
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