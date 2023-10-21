import { useRef, useEffect } from 'react';
import { CoordinatesType } from 'shared/types';
import { CELL_ATTRIBUTES } from 'shared/constants';

export const useCellCoordinates = (coordinates: CoordinatesType) => {
    const cellRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!cellRef.current) {
            return;
        }

        cellRef.current.setAttribute(CELL_ATTRIBUTES.X, coordinates.x.toString());
        cellRef.current.setAttribute(CELL_ATTRIBUTES.Y, coordinates.y.toString());
    }, []);

    return cellRef;
};