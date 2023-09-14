import React from 'react';
import { IBoardSection } from './interfaces';
import { CellFactory } from 'components/CellFactory';

export const BoardSection: React.FC<IBoardSection> = ({ board }) => {
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
