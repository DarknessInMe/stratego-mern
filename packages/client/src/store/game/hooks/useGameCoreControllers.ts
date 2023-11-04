import { useCallback } from 'react';
import { GameStateDispatchType } from 'store/game/types';
import { ActionsEnum } from 'store/game/enums';
import { IGameState } from 'store/game/interfaces';
import { GameStages } from 'shared/enums';
import { BoardFieldType } from 'shared/types';
import { ICell } from 'shared/interfaces';

export const gameCoreSlice = (state: IGameState) => ({
    [ActionsEnum.SET_MODE]: (mode: GameStages): IGameState => ({
        ...state,
        mode,
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
    const setMode = useCallback((mode: GameStages) => {
        console.log('mode', mode);
        dispatch({ type: ActionsEnum.SET_MODE, payload: mode });
    }, []);

    const setField = useCallback((field: BoardFieldType) => {
        dispatch({ type: ActionsEnum.SET_FIELD, payload: field });
    }, []);

    const updateCells = useCallback((cells: ICell[]) => {
        dispatch({ type: ActionsEnum.UPDATE_CELLS, payload: cells });
    }, []);

    return {
        setMode,
        setField,
        updateCells,
    };
};