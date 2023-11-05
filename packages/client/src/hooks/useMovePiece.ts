import { useCallback } from 'react';
import { useGameContext } from 'context/GameContext';
import { CanMoveBoardPieceTo, HandlePieceMovingType, OnMoveByClick } from 'shared/types';
import { useSelectionControllers } from 'store/game/hooks/useSelectionControllers';
import { socket } from 'socket';
import { BasePiece } from 'core/Pieces';
import { ICell } from 'shared/interfaces';
import { useGameCoreControllers } from 'store';

export const useMovePiece = () => {
    const { boardRef, gameDispatch, gameState } = useGameContext();
    const { dropSelection, attackPiece } = useSelectionControllers(gameDispatch);
    const { toggleTurn } = useGameCoreControllers(gameDispatch);

    const board = boardRef.current;

    const handleAttackOrMove = useCallback((piece: BasePiece, targetCell: ICell) => {
        if (targetCell.pieceId) {
            return attackPiece({
                attackerPieceId: piece.id,
                defenderPieceId: targetCell.pieceId,
            });
        }
        
        board.movePiece(piece, targetCell.x, targetCell.y);
        dropSelection();
        toggleTurn();
    }, []);

    const handlePieceMoving = useCallback<HandlePieceMovingType>((pieceQuery, newPosition) => {
        const targetCell = board.getCell(newPosition.x, newPosition.y);
        const draggedPiece = typeof pieceQuery === 'string' ?
            board.getPieceById(pieceQuery) :
            board.getPieceByCoordinates(pieceQuery.x, pieceQuery.y);

        if (!draggedPiece) {
            return;
        }

        socket.notifyAboutPieceMoving({
            to: {
                x: targetCell.x,
                y: targetCell.y
            },
            id: draggedPiece.id,
        });

        handleAttackOrMove(draggedPiece, targetCell);
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
        handleAttackOrMove,
    };
};
