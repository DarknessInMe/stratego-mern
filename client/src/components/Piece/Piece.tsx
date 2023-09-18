import React, { memo } from 'react';
import { PieceIconPicker } from './constants';
import { IPieceProps } from './interfaces';
import { PIECES } from 'shared/constants';
import { useDrag } from 'react-dnd';
import { DragTypesEnum } from 'shared/enums';

export const Piece: React.FC<IPieceProps> = memo(({ rankName, className = '' }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: DragTypesEnum.BANK_TO_BOARD,
        item: {
            rankName
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const icon = PieceIconPicker[rankName];
    const weight = PIECES[rankName];

    return (
        <div
            ref={dragRef}
            className={`piece ${isDragging ? 'piece_dragged' : ''}${className}`}
        >
            <img src={icon} className='piece__image'/>
            {weight !== 0 && (
                <span className='piece__weight'>{weight}</span>
            )}
        </div>
    );
});
