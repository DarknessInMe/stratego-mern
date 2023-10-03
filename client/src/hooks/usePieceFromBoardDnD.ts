import { useDrop } from 'react-dnd';
import { ICell, IDraggedItem } from 'shared/interfaces';
import { DragTypesEnum } from 'shared/enums';
import { useMovePiece } from 'hooks/useMovePiece';

export const usePieceFromBoardDnD = (cell: ICell) => {
    const { canMoveBoardPieceTo, handlePieceMoving } = useMovePiece();

    const dropResult = useDrop(() => ({
        accept: DragTypesEnum.PIECE_FROM_BOARD,
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
        canDrop: ({ coordinates }: IDraggedItem) => {
            return canMoveBoardPieceTo(coordinates, cell);
        },
        drop: ({ coordinates }: IDraggedItem) => {
            handlePieceMoving(coordinates, cell);
        },
    }), [cell.x, cell.y]);

    return dropResult;
};