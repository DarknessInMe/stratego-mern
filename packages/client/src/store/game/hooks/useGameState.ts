import { useReducer } from 'react';
import { PIECES_SETUP } from 'shared/constants';
import { GameStages } from 'shared/enums';
import { IGameState } from 'store/game/interfaces';
import { ActionType, StrategyType } from 'store/game/types';
import { bankSlice } from './useBankControllers';
import { selectionSlice } from './useSelectionControllers';
import { gameCoreSlice } from './useGameCoreControllers';
import { IUser, TeamsEnum } from '@stratego/common';

const getInitialState = (currentUser: IUser): IGameState => ({
    bank: PIECES_SETUP,
    field: [],
    mode: GameStages.SET_PIECES,
    selection: {
        selectedPieceId: null,
        attackedPieceId: null,
    },
    players: {
        currentPlayer: currentUser.team,
        opponentPlayer: currentUser.team === TeamsEnum.RED_TEAM ? TeamsEnum.BLUE_TEAM : TeamsEnum.RED_TEAM,
    }
});

const reducer = (state: IGameState, action: ActionType): IGameState => {
    const { type, payload } = action;

    const strategy: StrategyType = {
        ...bankSlice(state),
        ...selectionSlice(state),
        ...gameCoreSlice(state),
    };

    if (type in strategy) {
        return strategy[type](payload);
    }

    return state;
};

export const useGameState = (currentUser: IUser) => {
    return useReducer(reducer, currentUser, getInitialState);
};