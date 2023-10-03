import React, { memo, useCallback, useEffect } from 'react';
import { Piece } from './Piece';
import { IBoardPieceProps } from './interfaces';
import { useDrag } from 'react-dnd';
import { DragTypesEnum, GameStages } from 'shared/enums';
import { useRootContext } from 'context/RootContext';
import { useCellCoordinates } from 'hooks/useCellCoordinates';
import { BasePiece } from 'core/Pieces';
import { useSelection } from 'hooks/useSelection';
import { usePieceFromBoardDnD } from 'hooks/usePieceFromBoardDnD';
import { useMovePiece } from 'hooks/useMovePiece';

export const BoardPiece: React.FC<IBoardPieceProps> = memo(({ 
    rankName,
    team,
    coordinates,
    className,
}) => {
    const { 
        gameCoreRef, 
        mode,
        setSelection, 
    } = useRootContext();
    const pieceRef = useCellCoordinates(coordinates);
    const isSelected = useSelection(coordinates);
    const { onMoveByClick } = useMovePiece();

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

    const [, dropRef] = usePieceFromBoardDnD(board.getCell(coordinates.x, coordinates.y));

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
            onMoveByClick(coordinates);
        } else {
            handleSelectionByClick(currentPiece);
        }
    }, [mode, coordinates, onMoveByClick]);

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
            isDragging={isDragging}
            className={className}
            isSelected={isSelected}
        />
    );
});
