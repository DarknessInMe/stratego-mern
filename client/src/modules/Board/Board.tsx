import React from 'react';
import { FigureEntity, WaterEntity } from 'shared/interfaces';
import { BoardEntity } from 'shared/types';
import { useGameContext } from 'context';
import { Figure } from './components/Figure';
import { Land } from './components/Land';

const Board: React.FC = () => {
    const { board } = useGameContext();

    const boardEntityStrategy = (cell: BoardEntity, lineIndex: number, cellIndex: number) => {
        const key = `key-${lineIndex}x${cellIndex}`;

        switch(true) {
            case !!(cell as FigureEntity)?.figure: {
                return (
                    <Figure 
                        key={key} 
                        figureData={cell as FigureEntity} 
                        x={cellIndex} 
                        y={lineIndex}
                    />
                )
            }
            case (cell as WaterEntity)?.water: {
                return <div key={key} className="board__cell water"/>
            }
            default: {
                return <Land key={key} x={cellIndex} y={lineIndex}/>;
            }
        }
    }

    return (
        <div className="board__section">
            {
                board.map((line, lineIndex) => 
                    line.map((cell, cellIndex) => boardEntityStrategy(cell, lineIndex, cellIndex)))
            }
        </div>
    )
}

export { Board };