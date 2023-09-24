import React from 'react';
import { useDrop } from 'react-dnd';
import { ICellComponentProps, IDraggableCellProps } from 'shared/interfaces';
import { DragTypesEnum } from 'shared/enums';


export const withGameInProgressDnD = (WrappedComponent: React.FC<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = ({ cell }) => {
        const [{ isOver }, dropRef] = useDrop(() => ({
            accept: DragTypesEnum.PIECE_FROM_BOARD,
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
        }), [cell.x, cell.y]);

        return (
            <WrappedComponent 
                cell={cell}
                dropRef={dropRef}
                isOver={isOver}
            />
        );
    };

    return Component;
};