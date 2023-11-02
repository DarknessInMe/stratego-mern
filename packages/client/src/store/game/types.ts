import { PieceNameEnum } from 'shared/enums';
import { ActionsEnum } from './enums';
import { IGameState } from './interfaces';

export type ActionPatternTypes<T extends ActionsEnum, Y = void> = {
    type: T,
    payload?: Y
}

export type ActionType = 
    ActionPatternTypes<ActionsEnum.ADD_TO_BANK, PieceNameEnum> |
    ActionPatternTypes<ActionsEnum.REMOVE_FROM_BANK, PieceNameEnum>

export type StrategyType = {
    [Property in keyof typeof ActionsEnum]: (payload?: any) => IGameState
}

export type GameStateDispatchType = React.Dispatch<ActionType>