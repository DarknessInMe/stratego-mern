import { GameStages, PieceNameEnum } from 'shared/enums';
import { ActionsEnum } from './enums';
import { IAttackPiece, IGameState } from './interfaces';
import { BoardFieldType } from 'shared/types';
import { ICell } from 'shared/interfaces';

export type ActionPatternTypes<T extends ActionsEnum, Y = void> = {
    type: T,
    payload?: Y
}

export type ActionType = 
    ActionPatternTypes<ActionsEnum.ADD_TO_BANK, PieceNameEnum> |
    ActionPatternTypes<ActionsEnum.REMOVE_FROM_BANK, PieceNameEnum> |
    ActionPatternTypes<ActionsEnum.CLEAR_BANK> |
    ActionPatternTypes<ActionsEnum.DROP_SELECTION> |
    ActionPatternTypes<ActionsEnum.ATTACK_PIECE, IAttackPiece> |
    ActionPatternTypes<ActionsEnum.SELECT_PIECE, string> |
    ActionPatternTypes<ActionsEnum.SET_MODE, GameStages> |
    ActionPatternTypes<ActionsEnum.SET_FIELD, BoardFieldType> |
    ActionPatternTypes<ActionsEnum.UPDATE_CELLS, ICell[]> |
    ActionPatternTypes<ActionsEnum.TOGGLE_TURN>

export type StrategyType = {
    [Property in keyof typeof ActionsEnum]: (payload?: any) => IGameState
}

export type GameStateDispatchType = React.Dispatch<ActionType>