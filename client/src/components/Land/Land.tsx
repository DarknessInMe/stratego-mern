import React, { memo, useEffect } from 'react';
import { IDraggableCellProps } from 'shared/interfaces';
import { withStagedDnD } from 'hocs/withStagedDnD';
import { useCellCoordinates } from 'hooks/useCellCoordinates';
import clsx from 'clsx';
import { useSelection } from 'hooks/useSelection';
import { useMovePiece } from 'hooks/useMovePiece.1';

export const Land: React.FC<IDraggableCellProps> = withStagedDnD(memo(({ 
    dropRef, 
    isOver, 
    cell,
}) => {
    const { onMoveByClick } = useMovePiece();
    const { isCellHighlighted } = useSelection();
    const landRef = useCellCoordinates(cell);
    const isSelected = isCellHighlighted(cell);

    useEffect(() => {
        if (!landRef.current) {
            return;
        }

        dropRef(landRef.current);
    }, []);

    const onMove = () => {
        onMoveByClick(cell);
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