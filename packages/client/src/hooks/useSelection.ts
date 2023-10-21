import { useCallback } from 'react';
import { useRootContext } from 'context/RootContext';
import { CoordinatesType } from 'shared/types';
import { BasePiece } from 'core/Pieces';

export const useSelection = () => {
    const { selection, setSelection, gameCoreRef } = useRootContext();
    const { board } = gameCoreRef.current;

    const selectPiece = useCallback((piece: BasePiece) => {
        piece.initAvailablePath(board);
        setSelection((prevSelection) => ({
            ...prevSelection,
            selectedPieceId: piece.id,
        }));
    }, []);

    const isCellHighlighted = useCallback((cellCoordinates: CoordinatesType) => {
        const { selectedPieceId, attackedPieceId } = selection;

        if (!selectedPieceId || !!attackedPieceId) {
            return false;
        }

        const { currentAvailablePath } = board.getPieceById(selection.selectedPieceId);
        const isHighlightedCell = currentAvailablePath.some(({ x, y }) => cellCoordinates.x === x && cellCoordinates.y === y);

        return isHighlightedCell;
    }, [selection.selectedPieceId, selection.attackedPieceId]);

    return {
        selectPiece,
        isCellHighlighted,
    };
};