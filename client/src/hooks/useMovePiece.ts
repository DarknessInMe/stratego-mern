import { useCallback } from 'react';
import { useRootContext } from 'context/RootContext';
import { CanMoveBoardPieceTo, HandlePieceMovingType, OnMoveByClick } from 'shared/types';

export const useMovePiece = () => {
    const { gameCoreRef, selection, setSelection } = useRootContext();
    const { board } = gameCoreRef.current;

    const handlePieceMoving = useCallback<HandlePieceMovingType>((pieceQuery, newPosition) => {
        const targetCell = board.getCell(newPosition.x, newPosition.y);
        const draggedPiece = typeof pieceQuery === 'string' ?
            board.getPieceById(pieceQuery) :
            board.getPieceByCoordinates(pieceQuery.x, pieceQuery.y);

        if (!draggedPiece) {
            return;
        }

        if (targetCell.pieceId) {
            setSelection(prevSelection => ({
                ...prevSelection,
                attackedPieceId: targetCell.pieceId,
            }));
        } else {
            board.movePiece(draggedPiece, newPosition.x, newPosition.y);
            setSelection({
                selectedPieceId: null,
                attackedPieceId: null,
            });
        }
    }, []);

    const canMoveBoardPieceTo = useCallback<CanMoveBoardPieceTo>((movedFrom, moveTo) => {
        const draggedPiece = board.getPieceByCoordinates(movedFrom.x, movedFrom.y);

        if (draggedPiece) {
            return draggedPiece.isCorrectPath(moveTo.x, moveTo.y);
        }

        return false;
    }, []);

    const onMoveByClick = useCallback<OnMoveByClick>((cellPosition) => {
        if (!selection.selectedPieceId) {
            return;
        }

        const selectedPiece = board.getPieceById(selection.selectedPieceId);
        const isSelectedCell = selectedPiece.currentAvailablePath.some(({ x, y }) => cellPosition.x === x && cellPosition.y === y);

        if (isSelectedCell) {
            handlePieceMoving({ x: selectedPiece.x, y: selectedPiece.y }, cellPosition);
        }
    }, [selection.selectedPieceId, handlePieceMoving]);

    return {
        handlePieceMoving,
        canMoveBoardPieceTo,
        onMoveByClick,
    };
};
