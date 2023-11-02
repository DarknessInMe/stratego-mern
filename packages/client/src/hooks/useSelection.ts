import { useCallback } from 'react';
import { useRootContext } from 'context/RootContext';
import { CoordinatesType } from 'shared/types';
import { BasePiece } from 'core/Pieces';
import { useSelectionControllers } from 'store/game/hooks/useSelectionControllers';

export const useSelection = () => {
    const { gameState, gameDispatch, gameCoreRef } = useRootContext();
    const { selectPiece: markPieceAsSelected } = useSelectionControllers(gameDispatch);
    const { board } = gameCoreRef.current;

    const selectPiece = useCallback((piece: BasePiece) => {
        piece.initAvailablePath(board);
        markPieceAsSelected(piece.id);
    }, []);

    const isCellHighlighted = useCallback((cellCoordinates: CoordinatesType) => {
        const { selectedPieceId, attackedPieceId } = gameState.selection;

        if (!selectedPieceId || !!attackedPieceId) {
            return false;
        }

        const { currentAvailablePath } = board.getPieceById(selectedPieceId);
        const isHighlightedCell = currentAvailablePath.some(({ x, y }) => cellCoordinates.x === x && cellCoordinates.y === y);

        return isHighlightedCell;
    }, [gameState.selection.selectedPieceId, gameState.selection.attackedPieceId]);

    return {
        selectPiece,
        isCellHighlighted,
    };
};