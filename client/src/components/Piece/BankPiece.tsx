import React, { memo } from 'react';
import { Piece } from './Piece';
import { IPieceBase } from './interfaces';
import { useDrag } from 'react-dnd';
import { DragTypesEnum } from 'shared/enums';

export const BankPiece: React.FC<IPieceBase> = memo(({ 
    rankName, 
    className = '',
}) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: DragTypesEnum.PIECE_FROM_BANK,
        item: {
            rankName
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