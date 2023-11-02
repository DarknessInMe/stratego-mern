import { useCallback } from 'react';
import { GameStateDispatchType } from 'store/game/types';
import { ActionsEnum } from 'store/game/enums';
import { IGameState } from 'store/game/interfaces';
import { GameStages } from 'shared/enums';
import { BoardFieldType } from 'shared/types';
import { ICell } from 'shared/interfaces';

export const gameCoreSlice = (state: IGameState) => ({
    [ActionsEnum.TOGGLE_MODE]: (): IGameState => ({
        ...state,
        mode: state.mode === GameStages.GAME_IN_PROCESS ? GameStages.SET_PIECES : GameStages.GAME_IN_PROCESS,
    }),
    [ActionsEnum.SET_FIELD]: (field: BoardFieldType): IGameState => ({
        ...state,
        field, 
    }),
    [ActionsEnum.UPDATE_CELLS]: (cells: ICell[]): IGameState => {
        const fieldCopy = [...state.field];

        cells.forEach(cell => {
            fieldCopy[cell.y][cell.x] = cell;
        });

        return {
            ...state,
            field: fieldCopy,
        };
    }
});

export const useGameCoreControllers = (dispatch: GameStateDispatchType) => {
    const toggleMode = useCallback(() => {
        dispatch({ type: ActionsEnum.TOGGLE_MODE });
    }, []);

    const setField = useCallback((field: BoardFieldType) => {
        dispatch({ type: ActionsEnum.SET_FIELD, payload: field });
    }, []);

    const updateCells = useCallback((cells: ICell[]) => {
        dispatch({ type: ActionsEnum.UPDATE_CELLS, payload: cells });
    }, []);

    return {
        toggleMode,
        setField,
        updateCells,
    };
};