import React from 'react';
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
    const Component: React.FC<ICellComponentProps> = ({ cell }) => {
        const { gameCoreRef, field } = useRootContext();
        const [{ isOver }, dropRef] = useDrop(() => ({
            accept: DragTypesEnum.PIECE_FROM_BOARD,
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
            canDrop: ({ coordinates }: IDraggedItem) => {
                const { board } = gameCoreRef.current;
                const draggedItem = board.getCell(coordinates.x, coordinates.y);

                if (draggedItem.piece) {
                    return draggedItem.piece.isCorrectPath(cell.x, cell.y);
                }

                return false;
            },
            drop: ({ coordinates }: IDraggedItem) => {
                const { board } = gameCoreRef.current;
                const draggedItem = board.getCell(coordinates.x, coordinates.y);

                if (draggedItem.piece) {
                    board.movePiece(draggedItem.piece, cell.x, cell.y, false);
                }
            },
        }), [cell.x, cell.y, field]);

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