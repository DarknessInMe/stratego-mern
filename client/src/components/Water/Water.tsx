import React from 'react';
import { CoordinatesType } from 'shared/types';
import { useCellCoordinates } from 'hooks/useCellCoordinates';

interface IWaterProps {
    coordinates: CoordinatesType
}

export const Water: React.FC<IWaterProps> = ({ coordinates }) => {
    const waterCellRef = useCellCoordinates(coordinates);

    return (
        <div
            ref={waterCellRef}
            className='board__cell board__cell_water' 
        />
    );
};
