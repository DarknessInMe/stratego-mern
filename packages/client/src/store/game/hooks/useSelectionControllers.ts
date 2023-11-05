import { useCallback } from 'react';
import { GameStateDispatchType } from 'store/game/types';
import { ActionsEnum } from 'store/game/enums';
import { IAttackPiece, IGameState } from 'store/game/interfaces';

export const selectionSlice = (state: IGameState) => ({
    [ActionsEnum.DROP_SELECTION]: (): IGameState => ({
        ...state,
        selection: {
            selectedPieceId: null,
            attackerPieceId: null,
            defenderPieceId: null,
        }
    }),
    [ActionsEnum.ATTACK_PIECE]: (attackPayload: IAttackPiece): IGameState => ({
        ...state,
        selection: {
            selectedPieceId: null,
            ...attackPayload,
        },
    }),
    [ActionsEnum.SELECT_PIECE]: (selectedPieceId: string): IGameState => ({
        ...state,
        selection: {
            ...state.selection,
            selectedPieceId,
        },
    }),
});

export const useSelectionControllers = (dispatch: GameStateDispatchType) => {
    const dropSelection = useCallback(() => {
        dispatch({ type: ActionsEnum.DROP_SELECTION });
    }, []);

    const attackPiece = useCallback((attackPayload: IAttackPiece) => {
        dispatch({ type: ActionsEnum.ATTACK_PIECE, payload: attackPayload });
    }, []);

    const selectPiece = useCallback((pieceId: string) => {
        dispatch({ type: ActionsEnum.SELECT_PIECE, payload: pieceId });
    }, []);

    return {
        dropSelection,
        attackPiece,
        selectPiece,
    };
};