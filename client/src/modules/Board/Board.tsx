import React from 'react';
import { FigureEntity, WaterEntity } from 'shared/interfaces';
import { BoardEntity } from 'shared/types';
import { useGameContext } from 'context';
import { Figure } from './components/Figure';

const Board: React.FC = () => {
    const { board } = useGameContext();

    const boardEntityStrategy = (cell: BoardEntity, key: string) => {
        switch(true) {
            case !!(cell as FigureEntity)?.figure: {
                return <Figure key={key} figureData={cell as FigureEntity}/>
            }
            case (cell as WaterEntity)?.water: {
                return <div key={key} className="board__cell water"/>
            }
            default: {
                return <div key={key} className="board__cell land" />;
            }
        }
    }

    return (
        <div className="board">
            {
                board.map((line, lineIndex) => 
                    line.map((cell, cellIndex) => boardEntityStrategy(cell, `key-${lineIndex}x${cellIndex}`)))
            }
        </div>
    )
}

export { Board };