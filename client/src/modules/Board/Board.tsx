import React from 'react';
import { board } from '../../shared/constants';
import { FigureEntity, WaterEntity } from '../../shared/interfaces';
import { BoardEntity } from '../../shared/types';

const Board: React.FC = () => {

    const boardEntityStrategy = (cell: BoardEntity, key: string) => {
        switch(true) {
            case !!(cell as FigureEntity)?.figure: {
                return <div key={key} className="board__cell soldier" />
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