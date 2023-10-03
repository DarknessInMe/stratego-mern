import React, { memo } from 'react';
import { ICellComponentProps, IDraggableCellProps } from 'shared/interfaces';
import { usePieceFromBoardDnD } from 'hooks/usePieceFromBoardDnD';

export const withGameInProgressDnD = (WrappedComponent: React.FC<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = memo(({ cell, ...rest }) => {
        const [{ isOver }, dropRef] = usePieceFromBoardDnD(cell);

        return (
            <WrappedComponent
                {...rest} 
                cell={cell}
                dropRef={dropRef}
                isOver={isOver}
            />
        );
    });

    return Component;
};