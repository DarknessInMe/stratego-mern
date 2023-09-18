import React from 'react';
import { useDrop } from 'react-dnd';
import { ICellComponentProps } from 'shared/interfaces';
import { DragTypesEnum } from 'shared/enums';
import { useRootContext } from 'context/RootContext';
import { PIECES } from 'shared/constants';
import { RegularPiece } from 'core/Pieces/RegularPiece';

export const Land: React.FC<ICellComponentProps> = ({ cell }) => {
    const { gameCoreRef } = useRootContext();
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: DragTypesEnum.BANK_TO_BOARD,
        drop: ({ rankName }) => {
            const weight = PIECES[rankName];
            const piece = new RegularPiece(cell.x, cell.y, { name: rankName, weight });
            const { board } = gameCoreRef.current;
            
            board.addPieceTo(piece, cell.x, cell.y);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
      }), [cell.x, cell.y]);

    return (
        <div
            ref={dropRef}
            className={`board__cell board__cell_land ${isOver ? 'board__cell_hovered' : ''}`} 
        />
    );
};