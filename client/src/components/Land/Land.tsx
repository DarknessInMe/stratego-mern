import React, { useEffect } from 'react';
import { IDraggableCellProps } from 'shared/interfaces';
import { withStagedDnD } from 'hocs/withStagedDnD';
import { useCellCoordinates } from 'hooks/useCellCoordinates';

export const Land: React.FC<IDraggableCellProps> = withStagedDnD(({ dropRef, isOver, cell }) => {
    const landRef = useCellCoordinates({ x: cell.x, y: cell.y });

    useEffect(() => {
        if (!landRef.current) {
            return;
        }

        dropRef(landRef.current);
    }, []);

    return (
        <div
            ref={landRef}
            className={`board__cell board__cell_land ${isOver ? 'board__cell_hovered' : ''}`} 
        />
    );
});