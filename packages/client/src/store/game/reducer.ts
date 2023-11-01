import { useReducer, useCallback } from 'react';
import { PIECES_SETUP } from 'shared/constants';
import { GameStages, PieceNameEnum } from 'shared/enums';
import { IGameState } from './interfaces';
import { ActionType, StrategyType, ControllersType } from './types';
import { ActionsEnum } from './enums';

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

export const useBankControllers = (dispatch: React.Dispatch<ActionType>) => {
    const addToBank = useCallback((rankName: PieceNameEnum) => {
        dispatch({ type: ActionsEnum.ADD_TO_BANK, payload: rankName });
    }, []);

    const removeFromBank = useCallback((rankName: PieceNameEnum) => {
        dispatch({ type: ActionsEnum.REMOVE_FROM_BANK, payload: rankName });
    }, []);

    return {
        addToBank,
        removeFromBank,
    };
};

export const useGameState = (): [IGameState, ControllersType] => {
    const [state, dispatch] = useReducer(reducer, initState);
    const bankControllers = useBankControllers(dispatch);

    return [state, bankControllers];
};