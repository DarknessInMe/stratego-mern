import React, { useMemo, Fragment } from 'react';
import { TeamsEnum } from '@stratego/common';
import clsx from 'clsx';

interface IWarFog {
    opponentPlayer: TeamsEnum,
    isReversed: boolean,
}

export const WarFog: React.FC<IWarFog> = ({ opponentPlayer, isReversed }) => {
    const className = opponentPlayer === TeamsEnum.RED_TEAM ? 'piece_red' : 'piece_blue';
    const staticPieces = useMemo(() => {
        const x = new Array(10).fill(null);
        const y = new Array(4).fill(x);

        return y;
    }, []);

    return (
        <div className={clsx('war-fog', isReversed && 'war-fog_reversed')}>
            <div className='war-fog__container'>
                <div className='war-fog__eclipse'/>
                {staticPieces.map((row, y) => (
                    <Fragment
                        key={`static-row-${y}`}
                    >
                        {row.map((_, x) => (
                            <div
                                className={clsx('piece', 'piece_landed', className)}
                                key={`static-piece-${x}`}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
