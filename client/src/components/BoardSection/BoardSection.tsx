import React, { Fragment } from 'react';
import { CellFactory } from 'components/CellFactory';
import { useRootContext } from 'context/RootContext';

export const BoardSection: React.FC = () => {
    const { field } = useRootContext();

    return (
        <div className='screen__section screen__section_main'>
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
            </div>
        </div>
    );
};
