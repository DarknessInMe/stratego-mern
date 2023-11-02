import { useCallback } from 'react';
import { GameStateDispatchType } from 'store/game/types';
import { ActionsEnum } from 'store/game/enums';
import { IGameState } from 'store/game/interfaces';
import { GameStages } from 'shared/enums';

export const gameCoreSlice = (state: IGameState) => ({
    [ActionsEnum.TOGGLE_MODE]: (): IGameState => ({
        ...state,
        mode: state.mode === GameStages.GAME_IN_PROCESS ? GameStages.SET_PIECES : GameStages.GAME_IN_PROCESS,
    }),
});

export const useGameCoreControllers = (dispatch: GameStateDispatchType) => {
    const toggleMode = useCallback(() => {
        dispatch({ type: ActionsEnum.TOGGLE_MODE });
    }, []);

    return {
        toggleMode,
    };
};