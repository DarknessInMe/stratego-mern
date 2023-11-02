import { PieceNameEnum } from 'shared/enums';
import { ActionsEnum } from './enums';
import { IGameState } from './interfaces';

export type ActionPatternTypes<T extends ActionsEnum, Y = void> = {
    type: T,
    payload?: Y
}

export type ActionType = 
    ActionPatternTypes<ActionsEnum.ADD_TO_BANK, PieceNameEnum> |
    ActionPatternTypes<ActionsEnum.REMOVE_FROM_BANK, PieceNameEnum> |
    ActionPatternTypes<ActionsEnum.DROP_SELECTION> |
    ActionPatternTypes<ActionsEnum.ATTACK_PIECE, string> |
    ActionPatternTypes<ActionsEnum.SELECT_PIECE, string> |
    ActionPatternTypes<ActionsEnum.TOGGLE_MODE>

export type StrategyType = {
    [Property in keyof typeof ActionsEnum]: (payload?: any) => IGameState
}

export type GameStateDispatchType = React.Dispatch<ActionType>