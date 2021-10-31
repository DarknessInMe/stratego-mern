import React from 'react';
import { useGameContext } from 'context';
import { PickerDraggableFigure } from './components/PickerDraggableFigure';

const FigurePicker: React.FC = () => {
    const { picker } = useGameContext();

    return (
        <div className="picker">
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