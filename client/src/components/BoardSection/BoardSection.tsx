import React from 'react';
import { CellFactory } from 'components/CellFactory';
import { useRootContext } from 'context/RootContext';

export const BoardSection: React.FC = () => {
    const { field } = useRootContext();

    return (
        <div className='screen__section screen__section_main'>
            <div className='board'>
                {field.map((row, lineIndex) => row.map((cell, cellIndex) => (
                    <CellFactory
                        key={`key-${lineIndex}-${cellIndex}`}
                        cell={cell}
                    />
                )))}
            </div>
        </div>
    );
};
