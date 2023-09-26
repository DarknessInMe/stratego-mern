import React, { memo, useCallback } from 'react';
import { PieceIconPicker } from './constants';
import { IPieceProps } from './interfaces';
import { PIECES } from 'shared/constants';
import clsx from 'clsx';
import { TeamsEnum } from 'shared/enums';

export const Piece: React.FC<IPieceProps> = memo(({ 
    rankName,
    dragRef,
    isHidden,
    isDragging = false,
    className = '',
    team,
    onMouseDown,
}) => {
    const icon = PieceIconPicker[rankName];
    const weight = PIECES[rankName];

    const renderPiece = useCallback(() => {
        if (isHidden) return null;

        return (
            <>
                <img src={icon} className='piece__image'/>
                {weight !== 0 && (
                    <span className='piece__weight'>{weight}</span>
                )}
            </>
        );
    }, [isHidden, rankName]);

    return (
        <div
            ref={dragRef}
            className={clsx(
                'piece', 
                isDragging && 'piece_dragged', 
                className,
                team === TeamsEnum.RED_TEAM ? 'piece_red' : 'piece_blue',
            )}
            onMouseDown={onMouseDown}
        >
            {renderPiece()}
        </div>
    );
});
