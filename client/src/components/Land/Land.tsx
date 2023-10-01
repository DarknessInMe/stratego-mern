import React, { memo, useEffect } from 'react';
import { IDraggableCellProps } from 'shared/interfaces';
import { withStagedDnD } from 'hocs/withStagedDnD';
import { useCellCoordinates } from 'hooks/useCellCoordinates';
import clsx from 'clsx';
import { useRootContext } from 'context/RootContext';

export const Land: React.FC<IDraggableCellProps> = withStagedDnD(memo(({ 
    dropRef, 
    isOver, 
    cell,
    isSelected = false,
}) => {
    const { onMoveByClick } = useRootContext();
    const landRef = useCellCoordinates({ x: cell.x, y: cell.y });

    useEffect(() => {
        if (!landRef.current) {
            return;
        }

        dropRef(landRef.current);
    }, []);

    const onMove = () => {
        onMoveByClick(isSelected, cell);
    };

    return (
        <div
            ref={landRef}
            onMouseDown={onMove}
            className={clsx(
                'board__cell', 
                'board__cell_land', 
                isOver && 'board__cell_hovered',
                isSelected && 'possible-path',
            )} 
        />
    );
}));