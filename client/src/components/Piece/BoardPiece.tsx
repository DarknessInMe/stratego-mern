import React, { memo, useCallback } from 'react';
import { Piece } from './Piece';
import { IBoardPieceProps } from './interfaces';
import { useDrag } from 'react-dnd';
import { DragTypesEnum, GameStages } from 'shared/enums';
import { useRootContext } from 'context/RootContext';

export const BoardPiece: React.FC<IBoardPieceProps> = memo(({ 
    rankName,
    team,
    coordinates,
    className = '',
}) => {
    const { gameCoreRef, mode } = useRootContext();
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

    const onPieceClick = useCallback(() => {
        if (mode !== GameStages.GAME_IN_PROCESS) {
            return;
        }

        const currentPiece = board.getCell(coordinates.x, coordinates.y);

        if (currentPiece.piece) {
            currentPiece.piece.initAvailablePath(board);
        }
    }, [mode, coordinates]);

    return (
        <Piece
            onMouseDown={onPieceClick}
            dragRef={dragRef}
            isHidden={team !== currentPlayer.team}
            rankName={rankName}
            team={team}
            className={className}
            isDragging={isDragging}
        />
    );
});
