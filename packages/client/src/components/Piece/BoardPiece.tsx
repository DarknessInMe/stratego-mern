import React, { memo, useCallback, useEffect } from 'react';
import { Piece } from './Piece';
import { IBoardPieceProps } from './interfaces';
import { useDrag } from 'react-dnd';
import { DragTypesEnum, GameStages } from 'shared/enums';
import { useRootContext } from 'context/RootContext';
import { useCellCoordinates } from 'hooks/useCellCoordinates';
import { useSelection } from 'hooks/useSelection';
import { usePieceFromBoardDnD } from 'hooks/usePieceFromBoardDnD';
import { useMovePiece } from 'hooks/useMovePiece';

export const BoardPiece: React.FC<IBoardPieceProps> = memo(({ 
    rankName,
    team,
    coordinates,
    className,
}) => {
    const { gameCoreRef, mode, selection } = useRootContext();
    const pieceRef = useCellCoordinates(coordinates);
    const { isCellHighlighted, selectPiece } = useSelection();
    const { onMoveByClick } = useMovePiece();

    const { board, currentPlayer } = gameCoreRef.current;
    const isSelected = isCellHighlighted(coordinates);

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

    const definePieceHidden = () => {
        if (team === currentPlayer.team) {
            return false;
        }
        const currentPiece = board.getPieceByCoordinates(coordinates.x, coordinates.y);

        return selection.attackedPieceId !== currentPiece?.id;
    };

    const [, dropRef] = usePieceFromBoardDnD(board.getCell(coordinates.x, coordinates.y));
    const isHidden = definePieceHidden();

    useEffect(() => {
        if (!pieceRef.current) {
            return;
        }

        dropRef(dragRef(pieceRef.current));
    }, []);

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
            selectPiece(currentPiece);
        }
    }, [mode, coordinates, onMoveByClick]);

    
    return (
        <Piece
            ref={pieceRef}
            onMouseDown={onPieceClick}
            isHidden={isHidden}
            rankName={rankName}
            team={team}
            isDragging={isDragging}
            className={className}
            isSelected={isSelected}
        />
    );
});
