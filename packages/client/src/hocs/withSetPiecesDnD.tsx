import React, { memo } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ICellComponentProps, IDraggableCellProps } from 'shared/interfaces';
import { DragTypesEnum, PieceNameEnum } from 'shared/enums';
import { useRootContext } from 'context/RootContext';
import { CoordinatesType, ReactComponentWithRefType } from 'shared/types';
import { piecePicker } from 'shared/utils';

interface IBankToBoardItem {
    rankName: PieceNameEnum,
}

interface IBoardToBoardItem extends IBankToBoardItem {
    coordinates: CoordinatesType
}

interface IDropStrategy {
    [key: string]: (item: IBankToBoardItem | IBoardToBoardItem, monitor: DropTargetMonitor) => void;
}

export const withSetPiecesDnD = (WrappedComponent: ReactComponentWithRefType<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = memo(({ cell }) => {
        const { gameCoreRef, stateControllers } = useRootContext();
        const { board, currentPlayer } = gameCoreRef.current;
        const { removeFromBank } = stateControllers;

        const dropStrategy: IDropStrategy = {
            [DragTypesEnum.PIECE_FROM_BANK]: ({ rankName }: IBankToBoardItem) => {
                const pieceConstructor = piecePicker(rankName);
                const piece = new pieceConstructor(
                    cell.x, 
                    cell.y, 
                    rankName,
                    currentPlayer.team,
                );
                
                board.registerPiece(piece, cell.x, cell.y);
                removeFromBank(rankName);
            },
            [DragTypesEnum.PIECE_FROM_BOARD]: ({ coordinates }: IBoardToBoardItem) => {
                const piece = board.getPieceByCoordinates(coordinates.x, coordinates.y);

                if (piece) {
                    board.movePiece(piece, cell.x, cell.y);
                }
            },
        };
    
        const [{ isOver }, dropRef] = useDrop(() => ({
            accept: [DragTypesEnum.PIECE_FROM_BANK, DragTypesEnum.PIECE_FROM_BOARD],
            drop: (item: IBankToBoardItem, monitor) => {
                const itemType = monitor.getItemType() as string;
                const currentStrategy = dropStrategy[itemType];
    
                if (currentStrategy) {
                    currentStrategy(item, monitor);
                }
    
                return item;
            },
            canDrop: () => {
                const { board } = gameCoreRef.current;
                const targetCell = board.getCell(cell.x, cell.y);
                const [top, bottom] = currentPlayer.allowedRange;

                if (!(cell.y >= top && cell.y <= bottom)) {
                    return false;
                }

                return !targetCell.pieceId;
            },
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
        }), [cell.x, cell.y]);

        return (
            <WrappedComponent
                ref={dropRef}
                isOver={isOver}
            />
        );
    });

    return Component;
};