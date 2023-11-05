import { useCallback } from 'react';
import { useGameContext } from 'context/GameContext';
import { CoordinatesType } from 'shared/types';
import { BasePiece } from 'core/Pieces';
import { useSelectionControllers } from 'store/game/hooks/useSelectionControllers';

export const useSelection = () => {
    const { gameState, gameDispatch, boardRef, isCurrentPlayerTurn } = useGameContext();
    const { selectPiece: markPieceAsSelected } = useSelectionControllers(gameDispatch);
    const board = boardRef.current;

    const selectPiece = useCallback((piece: BasePiece) => {
        if (!isCurrentPlayerTurn) {
            return;
        }

        piece.initAvailablePath(board);
        markPieceAsSelected(piece.id);
    }, [isCurrentPlayerTurn]);

    const isCellHighlighted = useCallback((cellCoordinates: CoordinatesType) => {
        const { selectedPieceId, attackerPieceId, defenderPieceId } = gameState.selection;

        if (!selectedPieceId || [attackerPieceId, defenderPieceId].some(id => !!id)) {
            return false;
        }

        const { currentAvailablePath } = board.getPieceById(selectedPieceId);
        const isHighlightedCell = currentAvailablePath.some(({ x, y }) => cellCoordinates.x === x && cellCoordinates.y === y);

        return isHighlightedCell;
    }, [gameState.selection]);

    return {
        selectPiece,
        isCellHighlighted,
    };
};