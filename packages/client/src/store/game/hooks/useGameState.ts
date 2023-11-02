import { useReducer } from 'react';
import { PIECES_SETUP } from 'shared/constants';
import { GameStages } from 'shared/enums';
import { IGameState } from 'store/game/interfaces';
import { ActionType, StrategyType } from 'store/game/types';
import { bankSlice } from './useBankControllers';
import { selectionSlice } from './useSelectionControllers';

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
        ...bankSlice(state),
        ...selectionSlice(state),
    };

    if (type in strategy) {
        return strategy[type](payload);
    }

    return state;
};

export const useGameState = () => {
    return useReducer(reducer, initState);
};