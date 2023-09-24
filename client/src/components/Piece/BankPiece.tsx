import React, { memo } from 'react';
import { Piece } from './Piece';
import { IPieceBase } from './interfaces';
import { useDrag } from 'react-dnd';
import { DragTypesEnum, GameStages } from 'shared/enums';
import { useRootContext } from 'context/RootContext';

export const BankPiece: React.FC<IPieceBase> = memo(({ 
    rankName, 
    className = '',
}) => {
    const { mode } = useRootContext();
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: DragTypesEnum.PIECE_FROM_BANK,
        item: {
            rankName
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: () => mode !== GameStages.GAME_IN_PROCESS,
    }), [mode]);
    
    return (
        <Piece
            dragRef={dragRef}
            rankName={rankName}
            className={className}
            isDragging={isDragging}
        />
    );
});