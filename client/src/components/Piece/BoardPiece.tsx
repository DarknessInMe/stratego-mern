import React, { memo, useCallback, useEffect } from 'react';
import { Piece } from './Piece';
import { IBoardPieceProps } from './interfaces';
import { useDrag, useDrop } from 'react-dnd';
import { DragTypesEnum, GameStages } from 'shared/enums';
import { useRootContext } from 'context/RootContext';
import { useCellCoordinates } from 'hooks/useCellCoordinates';
import { IDraggedItem } from 'shared/interfaces';
import { BasePiece } from 'core/Pieces';
import { isSelectedByPossiblePath } from 'shared/utils';

export const BoardPiece: React.FC<IBoardPieceProps> = memo(({ 
    rankName,
    team,
    coordinates,
    isSelected,
    className,
}) => {
    const { 
        gameCoreRef, 
        mode,
        selection,
        setSelection, 
        handlePieceMoving, 
        canMoveBoardPieceTo,
        onMoveByClick,
    } = useRootContext();
    const pieceRef = useCellCoordinates(coordinates);

    const { board, currentPlayer } = gameCoreRef.current;

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: DragTypesEnum.PIECE_FROM_BOARD,
        item: {
            rankName, coordinates,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: () => team === currentPlayer.team,
    }));

    const [, dropRef] = useDrop(() => ({
        accept: DragTypesEnum.PIECE_FROM_BOARD,
        canDrop: (source: IDraggedItem) => {
            return canMoveBoardPieceTo(source.coordinates, coordinates);
        },
        drop: (source: IDraggedItem) => {
            handlePieceMoving(source.coordinates, coordinates);
        },
    }), [coordinates]);

    const handleSelectionByClick = (piece: BasePiece) => {
        setSelection({
            possiblePath: piece.initAvailablePath(board),
            pieceAt: coordinates
        });
    };

    const onPieceClick = useCallback(() => {
        if (mode !== GameStages.GAME_IN_PROCESS) {
            return;
        }

        const currentPiece = board.getPieceByCoordinates(coordinates.x, coordinates.y);

        if (!currentPiece) {
            return;
        }

        if (currentPiece.team !== currentPlayer.team) {
            onMoveByClick(isSelectedByPossiblePath(selection?.possiblePath, coordinates), coordinates);
        } else {
            handleSelectionByClick(currentPiece);
        }
    }, [mode, coordinates, selection?.possiblePath]);

    useEffect(() => {
        if (!pieceRef.current) {
            return;
        }

        dropRef(dragRef(pieceRef.current));
    }, []);
    
    return (
        <Piece
            ref={pieceRef}
            onMouseDown={onPieceClick}
            isHidden={team !== currentPlayer.team}
            rankName={rankName}
            team={team}
            isSelected={isSelected}
            isDragging={isDragging}
            className={className}
        />
    );
});
