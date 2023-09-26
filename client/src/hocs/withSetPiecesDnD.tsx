import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ICellComponentProps, IDraggableCellProps } from 'shared/interfaces';
import { DragTypesEnum, PieceNameEnum } from 'shared/enums';
import { useRootContext } from 'context/RootContext';
import { PIECES } from 'shared/constants';
import { CoordinatesType } from 'shared/types';
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

export const withSetPiecesDnD = (WrappedComponent: React.FC<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = ({ cell }) => {
        const { gameCoreRef, setBank } = useRootContext();

        const dropStrategy: IDropStrategy = {
            [DragTypesEnum.PIECE_FROM_BANK]: ({ rankName }: IBankToBoardItem) => {
                const { board, currentPlayer } = gameCoreRef.current;
                const pieceConstructor = piecePicker(rankName);
                const piece = new pieceConstructor(
                    cell.x, 
                    cell.y, 
                    { name: rankName, weight: PIECES[rankName] },
                    currentPlayer.team,
                );
                
                board.addPieceTo(piece, cell.x, cell.y);
                setBank((prevBank) => ({
                    ...prevBank,
                    [rankName]: prevBank[rankName] - 1,
                }));
            },
            [DragTypesEnum.PIECE_FROM_BOARD]: ({ coordinates }: IBoardToBoardItem) => {
                const { board } = gameCoreRef.current;
                const prevCell = board.getCell(coordinates.x, coordinates.y);
    
                if (prevCell.piece) {
                    board.movePiece(prevCell.piece, cell.x, cell.y, false);
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
    
                return !targetCell.piece;
            },
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