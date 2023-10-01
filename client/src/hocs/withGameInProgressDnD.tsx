import React, { memo } from 'react';
import { useDrop } from 'react-dnd';
import { ICellComponentProps, IDraggableCellProps, IDraggedItem } from 'shared/interfaces';
import { DragTypesEnum } from 'shared/enums';
import { useRootContext } from 'context/RootContext';

export const withGameInProgressDnD = (WrappedComponent: React.FC<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = memo(({ cell, ...rest }) => {
        const { handlePieceMoving, canMoveBoardPieceTo } = useRootContext();
        const [{ isOver }, dropRef] = useDrop(() => ({
            accept: DragTypesEnum.PIECE_FROM_BOARD,
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
            canDrop: ({ coordinates }: IDraggedItem) => {
                return canMoveBoardPieceTo(coordinates, cell);
            },
            drop: ({ coordinates }: IDraggedItem) => {
                handlePieceMoving(coordinates, { x: cell.x, y: cell.y });
            },
        }), [cell.x, cell.y]);

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