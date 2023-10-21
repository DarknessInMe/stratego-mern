import React, { memo, forwardRef } from 'react';
import { PieceIconPicker } from './constants';
import { IPieceProps } from './interfaces';
import { PIECES } from 'shared/constants';
import clsx from 'clsx';
import { TeamsEnum } from '@stratego/common';

const BasePiece = forwardRef<HTMLDivElement, IPieceProps>(({ 
    rankName,
    isHidden,
    team,
    onMouseDown,
    className = '',
    isDragging = false,
    isSelected = false,
}, ref) => {
    const icon = PieceIconPicker[rankName];
    const weight = PIECES[rankName];

    const renderPiece = () => {
        if (isHidden) return null;

        return (
            <>
                <img src={icon} className='piece__image'/>
                {weight !== 0 && (
                    <span className='piece__weight'>{weight}</span>
                )}
            </>
        );
    };

    return (
        <div
            ref={ref}
            className={clsx(
                'piece', 
                isDragging && 'piece_dragged',
                isSelected && 'possible-path',
                team === TeamsEnum.RED_TEAM ? 'piece_red' : 'piece_blue',
                className,
            )}
            onMouseDown={onMouseDown}
        >
            {renderPiece()}
        </div>
    );
});

export const Piece = memo(BasePiece);