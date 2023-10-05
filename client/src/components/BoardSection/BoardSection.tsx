import React, { memo, Fragment } from 'react';
import { CellFactory } from 'components/CellFactory';
import { useRootContext } from 'context/RootContext';
import clsx from 'clsx';
import { GameStages } from 'shared/enums';

export const BoardSection: React.FC = memo(() => {
    const { field, mode } = useRootContext();
    const isSetPiecesStage = mode === GameStages.SET_PIECES;

    return (
        <div className={clsx(
            'screen__section', 
            'screen__section_main',
            isSetPiecesStage && 'screen__section_eclipsed'
        )}>
            <div className='board'>
                {field.map((row, lineIndex) => (
                    <Fragment
                        key={`row-${lineIndex}`}
                    >
                        {row.map((cell, cellIndex) => (
                            <CellFactory
                                key={`cell-${cellIndex}`}
                                cell={cell}
                            />
                        ))}
                    </Fragment>
                ))}
                {isSetPiecesStage && <div className='board__eclipse'/>}
            </div>
        </div>
    );
});
