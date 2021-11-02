import React from 'react';
import { useGameContext } from 'context';
import { PickerDraggableFigure } from './components/PickerDraggableFigure';
import { useDrop } from 'react-dnd';
import { BoardTypes } from 'shared/enums';
import { Figure } from 'shared/interfaces';
import { useSetupUtils } from 'hooks';

const FigurePicker: React.FC = () => {
    const { picker } = useGameContext();
    const { dropFigureToPicker } = useSetupUtils();

    const [, dropRef] = useDrop({
        accept: BoardTypes.FIGURE,
        drop: dropFigureToPicker
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