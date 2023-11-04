import React, { memo } from 'react';
import { IDraggableCellProps } from 'shared/interfaces';

export const withStaticState = (WrappedComponent: React.FC<IDraggableCellProps>) => {
    return memo(() => {
        return (
            <WrappedComponent
                isOver={false}
                isHighlighted={false}
            />
        );
    });
};