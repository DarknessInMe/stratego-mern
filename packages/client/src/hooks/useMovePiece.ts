import { useCallback } from 'react';
import { useRootContext } from 'context/RootContext';
import { CanMoveBoardPieceTo, HandlePieceMovingType, OnMoveByClick } from 'shared/types';
import { useSelectionControllers } from 'store/game/hooks/useSelectionControllers';

export const useMovePiece = () => {
    const { boardRef, gameDispatch, gameState } = useRootContext();
    const { dropSelection, attackPiece } = useSelectionControllers(gameDispatch);
    const board = boardRef.current;

    const handlePieceMoving = useCallback<HandlePieceMovingType>((pieceQuery, newPosition) => {
        const targetCell = board.getCell(newPosition.x, newPosition.y);
        const draggedPiece = typeof pieceQuery === 'string' ?
            board.getPieceById(pieceQuery) :
            board.getPieceByCoordinates(pieceQuery.x, pieceQuery.y);

        if (!draggedPiece) {
            return;
        }

        if (targetCell.pieceId) {
            return attackPiece(targetCell.pieceId);
        }
        
        board.movePiece(draggedPiece, newPosition.x, newPosition.y);
        dropSelection();
    }, []);

    const canMoveBoardPieceTo = useCallback<CanMoveBoardPieceTo>((movedFrom, moveTo) => {
        const draggedPiece = board.getPieceByCoordinates(movedFrom.x, movedFrom.y);

        if (draggedPiece) {
            return draggedPiece.isCorrectPath(moveTo.x, moveTo.y);
        }

        return false;
    }, []);

    const onMoveByClick = useCallback<OnMoveByClick>((cellPosition) => {
        if (!gameState.selection.selectedPieceId) {
            return;
        }

        const selectedPiece = board.getPieceById(gameState.selection.selectedPieceId);
        const isSelectedCell = selectedPiece.currentAvailablePath.some(({ x, y }) => cellPosition.x === x && cellPosition.y === y);

        if (isSelectedCell) {
            handlePieceMoving({ x: selectedPiece.x, y: selectedPiece.y }, cellPosition);
        }
    }, [gameState.selection.selectedPieceId, handlePieceMoving]);

    return {
        handlePieceMoving,
        canMoveBoardPieceTo,
        onMoveByClick,
    };
};
