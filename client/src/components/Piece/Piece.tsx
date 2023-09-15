import React, { memo } from 'react';
import { PieceIconPicker } from './constants';
import { IPieceProps } from './interfaces';
import { PIECES } from 'shared/constants';

export const Piece: React.FC<IPieceProps> = memo(({ rankName }) => {
    const icon = PieceIconPicker[rankName];
    const weight = PIECES[rankName];

    return (
        <div className='piece piece_stored'>
            <img src={icon} className='piece__image'/>
            {weight !== 0 && (
                <span className='piece__weight'>{weight}</span>
            )}
        </div>
    );
});
