import React from 'react';
import { IDraggableCellProps } from 'shared/interfaces';
import { withStagedDnD } from 'hocs/withStagedDnD';

export const Land: React.FC<IDraggableCellProps> = withStagedDnD(({ dropRef, isOver }) => {
    return (
        <div
            ref={dropRef}
            className={`board__cell board__cell_land ${isOver ? 'board__cell_hovered' : ''}`} 
        />
    );
});