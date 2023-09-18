import React from 'react';
import { CellFactory } from 'components/CellFactory';
import { useRootContext } from 'context/RootContext';

export const BoardSection: React.FC = () => {
    const { board } = useRootContext();

    return (
        <div className='screen__section screen__section_main'>
            <div className='board'>
                {board.map((row, lineIndex) => row.map((cell, cellIndex) => (
                    <CellFactory
                        key={`key-${lineIndex}-${cellIndex}`}
                        cell={cell}
                    />
                )))}
            </div>
        </div>
    );
};
