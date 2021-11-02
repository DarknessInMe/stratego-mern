import React from 'react';
import { useGameContext } from 'context';
import { PickerDraggableFigure } from './components/PickerDraggableFigure';
import { useDrop } from 'react-dnd';
import { BoardTypes } from 'shared/enums';
import { Figure } from 'shared/interfaces';
import { deepCopy } from 'shared/utils';

interface FigureFromBoardDrop {
    figure: Figure,
    x: number,
    y: number,
}

const FigurePicker: React.FC = () => {
    const { picker, setPicker, setBoard } = useGameContext();
    const [, dropRef] = useDrop({
        accept: BoardTypes.FIGURE,
        drop: (item: FigureFromBoardDrop) => {
            const { x, y, figure } = item;

            setPicker(prevPicker => [...prevPicker, figure]);
            setBoard(prevBoard => {
                const stateCopy = deepCopy(prevBoard);

                stateCopy[y][x] = null;

                return stateCopy;
            })
        }
    })

    return (
        <div className="picker" ref={dropRef}>
            {
                picker.map((figure, index) => 
                    <PickerDraggableFigure 
                        figure={figure} 
                        key={index}
                        index={index}
                    />)
            }
        </div>
    )
}

export { FigurePicker };