import React, { useEffect } from 'react';
import { useGameContext } from 'context';
import { useDrag } from 'react-dnd';
import { PickerTypes, Teams } from 'shared/enums';
import { Figure } from 'shared/interfaces';
import { deepCopy } from 'shared/utils';

interface PickerDraggableFigure {
    figure: Figure,
    index: number,
}

const PickerDraggableFigure: React.FC<PickerDraggableFigure> = ({ figure, index }) => {
    const { utils } = useGameContext();
    const [, dragRef] = useDrag(() => ({
        type: PickerTypes.FIGURE,
        item: { figure, index },
    }), [figure, index]);

    return (
        <div className="picker__figure soldier" ref={dragRef}>
            <img src={figure.image}/>
            {utils.shouldGenerateRankWeight(figure) && (
                <strong className='soldier__rank'>{figure.rankWeight}</strong>
            )}
        </div>
    )
};

export { PickerDraggableFigure };