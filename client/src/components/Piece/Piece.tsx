import React, { memo } from 'react';
import { PieceIconPicker } from './constants';
import { IPieceProps } from './interfaces';
import { PIECES } from 'shared/constants';
import { ConnectableElement, useDrag } from 'react-dnd';
import { DragTypesEnum } from 'shared/enums';

export const Piece: React.FC<IPieceProps> = memo(({ 
    rankName, 
    className = '',
    coordinates = null,
}) => {
    const [{ isDragging: bankToBoardDragging }, bankToBoardRef] = useDrag(() => ({
        type: DragTypesEnum.BANK_TO_BOARD,
        item: {
            rankName
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const [{ isDragging: boardToBankDragging }, boardToBankRef] = useDrag(() => ({
        type: DragTypesEnum.BOARD_TO_BANK,
        item: {
            rankName, coordinates,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const icon = PieceIconPicker[rankName];
    const weight = PIECES[rankName];
    const isDragging = bankToBoardDragging || boardToBankDragging;

    const ref = (node: ConnectableElement) => {
        return bankToBoardRef(boardToBankRef(node));
    };

    return (
        <div
            ref={ref}
            className={`piece ${isDragging ? 'piece_dragged' : ''} ${className}`}
        >
            <img src={icon} className='piece__image'/>
            {weight !== 0 && (
                <span className='piece__weight'>{weight}</span>
            )}
        </div>
    );
});
