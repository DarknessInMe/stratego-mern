import { useGameContext } from 'context';
import React from 'react';
import { useDrop } from 'react-dnd';
import { BoardTypes, PickerTypes, Teams } from 'shared/enums';
import { Figure } from 'shared/interfaces';
import { deepCopy } from 'shared/utils';

interface Land {
    x: number,
    y: number,
}

interface PickerFigureDragItem {
    figure: Figure,
    index: number
}


interface FigureFromBoardDrop {
    figure: Figure,
    x: number,
    y: number,
}

const Land: React.FC<Land> = ({ x, y }) => {
    const { setBoard, setPicker } = useGameContext();
    const [, dropRef] = useDrop({
        accept: [PickerTypes.FIGURE, BoardTypes.FIGURE],
        drop: (item: PickerFigureDragItem | FigureFromBoardDrop, monitor) => {
            const type = monitor.getItemType();

            if (type === PickerTypes.FIGURE) {
                const { figure, index } = item as PickerFigureDragItem;

                setBoard(prevBoardState => {
                    const stateCopy = deepCopy(prevBoardState);

                    stateCopy[y][x] = {
                        team: Teams.RED_TEAM,
                        selected: false,
                        position: {
                            x, y,
                        },
                        figure,
                    }

                    return stateCopy;
                });

                setPicker(prevPickerState => {
                    const stateCopy = [...prevPickerState];
                    
                    stateCopy.splice(index, 1);

                    return stateCopy;
                })
                return;
            }
            
            if (type === BoardTypes.FIGURE) {
                const { figure, ...figurePos } = item as FigureFromBoardDrop;

                setBoard(prevBoardState => {
                    const stateCopy = deepCopy(prevBoardState);

                    stateCopy[y][x] = prevBoardState[figurePos.y][figurePos.x];
                    stateCopy[figurePos.y][figurePos.x] = null;

                    return stateCopy;
                })
                return;
            }
        },
    })

    return <div ref={dropRef} className="board__cell land" />
}

export { Land };