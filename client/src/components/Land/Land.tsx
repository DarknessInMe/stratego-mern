import React, { memo, useEffect } from 'react';
import { IDraggableCellProps } from 'shared/interfaces';
import { withStagedDnD } from 'hocs/withStagedDnD';
import { useCellCoordinates } from 'hooks/useCellCoordinates';
import clsx from 'clsx';

export const Land: React.FC<IDraggableCellProps> = withStagedDnD(memo(({ 
    dropRef, 
    isOver, 
    cell,
    className = '',
}) => {
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
            className={clsx(
                'board__cell', 
                'board__cell_land', 
                isOver && 'board__cell_hovered',
                className,
            )} 
        />
    );
}));