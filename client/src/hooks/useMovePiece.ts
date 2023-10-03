import { useCallback } from 'react';
import { useRootContext } from 'context/RootContext';
import { CanMoveBoardPieceTo, HandlePieceMovingType, OnMoveByClick } from 'shared/types';
import { isSelectedByPossiblePath } from 'shared/utils';

export const useMovePiece = () => {
    const { gameCoreRef, selection, setSelection } = useRootContext();

    const handlePieceMoving = useCallback<HandlePieceMovingType>((pieceQuery, newPosition) => {
        const { board } = gameCoreRef.current;
        const targetCell = board.getCell(newPosition.x, newPosition.y);
        const draggedPiece = typeof pieceQuery === 'string' ? 
            board.getPieceById(pieceQuery) :
            board.getPieceByCoordinates(pieceQuery.x, pieceQuery.y);

        if (!draggedPiece) {
            return;
        }

        if (targetCell.pieceId) {
            const targetPiece = board.getPieceById(targetCell.pieceId);
            const fightResult = draggedPiece.canBeat(targetPiece.rankName);

            console.log(fightResult);
        } else {
            board.movePiece(draggedPiece, newPosition.x, newPosition.y);
        }

        setSelection(null);
    }, []);

    const canMoveBoardPieceTo = useCallback<CanMoveBoardPieceTo>((movedFrom, moveTo) => {
        const { board } = gameCoreRef.current;
        const draggedPiece = board.getPieceByCoordinates(movedFrom.x, movedFrom.y);

        if (draggedPiece) {
            return draggedPiece.isCorrectPath(moveTo.x, moveTo.y);
        }

        return false;
    }, []);

    const onMoveByClick = useCallback<OnMoveByClick>((cellPosition) => {
        const isSelectedCell = isSelectedByPossiblePath(selection?.possiblePath, cellPosition);

        if (!isSelectedCell || !selection) {
            return;
        }

        handlePieceMoving(selection.pieceAt, cellPosition);
    }, [selection, handlePieceMoving]);

    return {
        handlePieceMoving,
        canMoveBoardPieceTo,
        onMoveByClick,
    };
};