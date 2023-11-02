import { useCallback } from 'react';
import { PieceNameEnum } from 'shared/enums';
import { GameStateDispatchType } from 'store/game/types';
import { ActionsEnum } from 'store/game/enums';

export const useBankControllers = (dispatch: GameStateDispatchType) => {
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