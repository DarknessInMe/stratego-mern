import React, { memo } from 'react';
import { Piece } from './Piece';
import { IBoardPieceProps } from './interfaces';
import { useDrag } from 'react-dnd';
import { DragTypesEnum } from 'shared/enums';

export const BoardPiece: React.FC<IBoardPieceProps> = memo(({ 
    rankName, 
    coordinates,
    className = '',
}) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: DragTypesEnum.PIECE_FROM_BOARD,
        item: {
            rankName, coordinates,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <Piece
            dragRef={dragRef}
            rankName={rankName}
            className={className}
            isDragging={isDragging}
        />
    );
});
