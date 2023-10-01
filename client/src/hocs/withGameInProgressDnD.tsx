import React, { memo } from 'react';
import { useDrop } from 'react-dnd';
import { ICellComponentProps, IDraggableCellProps } from 'shared/interfaces';
import { DragTypesEnum, PieceNameEnum } from 'shared/enums';
import { useRootContext } from 'context/RootContext';
import { CoordinatesType } from 'shared/types';

interface IDraggedItem {
    rankName: PieceNameEnum,
    coordinates: CoordinatesType
}

export const withGameInProgressDnD = (WrappedComponent: React.FC<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = memo(({ cell, ...rest }) => {
        const { gameCoreRef, field, setSelection } = useRootContext();
        const [{ isOver }, dropRef] = useDrop(() => ({
            accept: DragTypesEnum.PIECE_FROM_BOARD,
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
            canDrop: ({ coordinates }: IDraggedItem) => {
                const { board } = gameCoreRef.current;
                const draggedPiece = board.getPieceByCoordinates(coordinates.x, coordinates.y);

                if (draggedPiece) {
                    return draggedPiece.isCorrectPath(cell.x, cell.y);
                }

                return false;
            },
            drop: ({ coordinates }: IDraggedItem) => {
                const { board } = gameCoreRef.current;
                const draggedPiece = board.getPieceByCoordinates(coordinates.x, coordinates.y);

                if (draggedPiece) {
                    board.movePiece(draggedPiece, cell.x, cell.y);
                    setSelection(null);
                }
            },
        }), [cell.x, cell.y, field]);

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