import { PIECES_SETUP } from 'shared/constants';
import { GameStages } from 'shared/enums';
import { ITeamsState, ISelectionState } from 'shared/interfaces';
import { BoardFieldType } from 'shared/types';

export interface IGameState {
    bank: typeof PIECES_SETUP,
    field: BoardFieldType,
    mode: GameStages,
    selection: ISelectionState,
    teams: ITeamsState,
}

export interface IAttackPiece {
    defenderPieceId: string,
    attackerPieceId: string,
}