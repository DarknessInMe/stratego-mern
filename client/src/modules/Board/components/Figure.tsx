import React from 'react';
import { FigureEntity } from 'shared/interfaces';
import clsx from 'clsx';
import { BoardTypes, Teams } from 'shared/enums';
import { useGameContext } from 'context';
import { useDrag } from 'react-dnd';
import { deepCopy } from 'shared/utils';

interface Figure {
    figureData: FigureEntity;
    x: number,
    y: number,
}

const Figure: React.FC<Figure> = ({ figureData, x, y }) => {
    const { utils } = useGameContext();
    const [, dragRef] = useDrag(() => ({
        type: BoardTypes.FIGURE,
        item: { figure: figureData.figure, x, y },
    }), [figureData])

    return (
        <div
            ref={dragRef} 
            className={clsx(
                'board__cell', 
                'soldier',
                figureData.team === Teams.BLUE_TEAM ? 'soldier_blue' : 'soldier_red',
            )
        }>
            <img src={figureData.figure.image}/>
            {utils.shouldGenerateRankWeight(figureData.figure) && (
                <strong className='soldier__rank'>{figureData.figure.rankWeight}</strong>
            )}
        </div>
    )
}

export { Figure };