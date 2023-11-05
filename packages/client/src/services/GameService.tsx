import React, { memo, useEffect } from 'react';
import { IDispositionItem, IPieceMovePayload, RESPONSE_EVENTS } from '@stratego/common';
import { socket } from 'socket';
import { useGameContext } from 'context/GameContext';
import { useMovePiece } from 'hooks/useMovePiece';

export const GameService = memo(() => {
    const { boardRef, gameState } = useGameContext();
    const { handleAttackOrMove } = useMovePiece();

    const onDispositionReceiver = (disposition: IDispositionItem[]) => {
        boardRef.current.registerDisposition(disposition, gameState.teams.opponentPlayer);
    };

    const onOpponentTurn = (movingPayload: IPieceMovePayload) => {
        const { to, id } = movingPayload;
        const targetCell = boardRef.current.getCell(to.x, to.y);
        const movedPiece = boardRef.current.getPieceById(id);

        handleAttackOrMove(movedPiece, targetCell);
    };
    
    useEffect(() => {
        socket.root.on(RESPONSE_EVENTS.ON_DISPOSITION_RECEIVED, onDispositionReceiver);
        socket.root.on(RESPONSE_EVENTS.ON_PIECE_MOVED, onOpponentTurn);

        return () => {
            socket.root.off(RESPONSE_EVENTS.ON_DISPOSITION_RECEIVED, onDispositionReceiver);
            socket.root.off(RESPONSE_EVENTS.ON_PIECE_MOVED, onOpponentTurn);
        };
	}, []);

    return (
        <></>
    );
});
