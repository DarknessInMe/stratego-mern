import { useReducer } from 'react';
import { PIECES_SETUP } from 'shared/constants';
import { GameStages, PieceNameEnum } from 'shared/enums';
import { IGameState } from 'store/game/interfaces';
import { ActionType, StrategyType } from 'store/game/types';
import { ActionsEnum } from 'store/game/enums';

const initState: IGameState = {
    bank: PIECES_SETUP,
    field: [],
    mode: GameStages.SET_PIECES,
    selection: {
        selectedPieceId: null,
        attackedPieceId: null,
    },
    players: {
        currentPlayer: null,
        opponentPlayer: null
    }
};

const reducer = (state: IGameState, action: ActionType): IGameState => {
    const { type, payload } = action;

    const strategy: StrategyType = {
        [ActionsEnum.ADD_TO_BANK]: (rankName: PieceNameEnum) => ({
            ...state,
            bank: {
                ...state.bank,
                [rankName]: state.bank[rankName] + 1,
            }
        }),
        [ActionsEnum.REMOVE_FROM_BANK]: (rankName) => ({
            ...state,
            bank: {
                ...state.bank,
                [rankName]: state.bank[rankName] - 1,
            }
        }),
    };

    if (type in strategy) {
        return strategy[type](payload);
    }

    return state;
};

export const useGameState = () => {
    return useReducer(reducer, initState);
};