import React, { memo, useRef, useEffect } from 'react';
import { Piece } from './Piece';
import { BankPieceTypes } from './types';
import { useDrag } from 'react-dnd';
import { DragTypesEnum, GameStages } from 'shared/enums';
import { useRootContext } from 'context/RootContext';

export const BankPiece: React.FC<BankPieceTypes> = memo(({ rankName }) => {
    const { gameState } = useRootContext();
    const pieceRef = useRef<HTMLDivElement | null>(null);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: DragTypesEnum.PIECE_FROM_BANK,
        item: {
            rankName
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: () => gameState.mode !== GameStages.GAME_IN_PROCESS,
    }), [gameState.mode]);
    
    useEffect(() => {
        if (!pieceRef.current) {
            return;
        }

        dragRef(pieceRef.current);
    }, []);

    return (
        <Piece
            ref={pieceRef}
            isHidden={false}
            team={gameState.teams.currentPlayer}
            rankName={rankName}
            isDragging={isDragging}
        />
    );
});