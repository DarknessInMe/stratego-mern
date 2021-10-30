import React from 'react';
import { FigureEntity } from '../../../shared/interfaces';
import clsx from 'clsx';
import { Teams } from '../../../shared/enums';

interface Figure {
    figureData: FigureEntity;
}

const Figure: React.FC<Figure> = ({ figureData }) => {
    
    return (
        <div className={clsx(
            'board__cell', 
            'soldier',
            figureData.team === Teams.BLUE_TEAM ? 'soldier_blue' : 'soldier_red',
        )}>
            <img src={figureData.figure.image}/>
            <strong className='soldier__rank'>{figureData.figure.rankWeight}</strong>
        </div>
    )
}

export { Figure };