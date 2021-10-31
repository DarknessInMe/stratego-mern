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


interface DropResult {
    position: {
        x: number,
        y: number,
    }
}

const PickerDraggableFigure: React.FC<PickerDraggableFigure> = ({ figure, index }) => {
    const { utils, setBoard, setPicker } = useGameContext();
    const [, dragRef] = useDrag(() => ({
        type: PickerTypes.FIGURE,
        item: figure,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>();

            if (!dropResult) return;

            setBoard(prevBoardState => {
                const { x, y } = dropResult.position;
                const stateCopy = deepCopy(prevBoardState);

                stateCopy[y][x] = {
                    team: Teams.RED_TEAM,
                    selected: false,
                    position: {
                        x, y,
                    },
                    figure: item,
                }

                return stateCopy;
            });

            setPicker(prevPickerState => {
                const stateCopy = [...prevPickerState];
                
                stateCopy.splice(index, 1);

                return stateCopy;
            })
        }
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