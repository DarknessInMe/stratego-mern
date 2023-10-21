import React, { memo, forwardRef } from 'react';
import { IDraggableCellProps } from 'shared/interfaces';
import clsx from 'clsx';
import { withStagedDnD } from 'hocs/withStagedDnD';

const BaseLand = forwardRef<HTMLDivElement, IDraggableCellProps>((props, ref) => {
    const {
        onMouseDown,
        isOver = false, 
        isHighlighted = false,
    } = props;

    return (
        <div
            ref={ref}
            onMouseDown={onMouseDown}
            className={clsx(
                'board__cell', 
                'board__cell_land', 
                isOver && 'board__cell_hovered',
                isHighlighted && 'possible-path',
            )} 
        />
    );
});

export const Land = withStagedDnD(memo(BaseLand));