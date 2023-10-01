import React, { memo, useCallback, useEffect } from 'react';
import { Piece } from './Piece';
import { IBoardPieceProps } from './interfaces';
import { useDrag } from 'react-dnd';
import { DragTypesEnum, GameStages } from 'shared/enums';
import { useRootContext } from 'context/RootContext';
import { useCellCoordinates } from 'hooks/useCellCoordinates';

export const BoardPiece: React.FC<IBoardPieceProps> = memo(({ 
    rankName,
    team,
    coordinates,
    className = '',
}) => {
    const { gameCoreRef, mode, setSelection } = useRootContext();
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

    const onPieceClick = useCallback(() => {
        if (mode !== GameStages.GAME_IN_PROCESS) {
            return;
        }

        const currentPiece = board.getPieceByCoordinates(coordinates.x, coordinates.y);

        if (currentPiece) {
            const possiblePath = currentPiece.initAvailablePath(board);
            setSelection({
                possiblePath,
                pieceAt: coordinates
            });
        }
    }, [mode, coordinates]);

    useEffect(() => {
        if (!pieceRef.current) {
            return;
        }

        dragRef(pieceRef.current);
    }, []);
    
    return (
        <Piece
            ref={pieceRef}
            onMouseDown={onPieceClick}
            isHidden={team !== currentPlayer.team}
            rankName={rankName}
            team={team}
            className={className}
            isDragging={isDragging}
        />
    );
});
