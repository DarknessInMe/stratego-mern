import React, { useEffect, useMemo, useState } from 'react';
import { BankPiece } from 'components/Piece';
import { useGameContext } from 'context/GameContext';
import { generateInitSetup } from 'shared/utils';
import { useDrop } from 'react-dnd';
import { DragTypesEnum, GameStages, PieceNameEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';
import { useBankControllers, useGameCoreControllers } from 'store';
import { useSessionContext } from 'context/SessionContext';
import { useControllers } from 'hooks/useControllers';
import { socket } from 'socket';

interface IDrop {
    rankName: PieceNameEnum,
    coordinates: CoordinatesType | null,
}

export const PieceBankSection: React.FC = () => {
    const { session, currentUser, userStatuses } = useSessionContext();
    const { gameState, gameDispatch, boardRef } = useGameContext();
    const [countdown, setCountdown] = useState<number | null>(null);

    const { onToggleGame } = useControllers(); 
    const { addToBank } = useBankControllers(gameDispatch);
    const { setMode } = useGameCoreControllers(gameDispatch);

    const isGameInProcess = gameState.mode === GameStages.GAME_IN_PROCESS;
    const currentUserStatus = userStatuses[currentUser.id];
    const isBankNotEmpty = Object.values(gameState.bank).some(count => count !== 0);
    const board = boardRef.current;

    const [_, dropRef] = useDrop(() => ({
        accept: DragTypesEnum.PIECE_FROM_BOARD,
        drop: ({ rankName, coordinates }: IDrop) => {
            addToBank(rankName);

            if (coordinates) {
                board.destroyPieces([coordinates]);
            }
        },
        canDrop: () => !isGameInProcess,
      }), [gameState.mode]);

    const bankArray = useMemo(() => {
        return generateInitSetup(gameState.bank);
    }, [gameState.bank]);

    const onReady = () => {
        onToggleGame();
        setMode(gameState.mode === GameStages.SET_PIECES ? GameStages.READY : GameStages.SET_PIECES);
    };

    useEffect(() => {
        const statuses = Object.values(userStatuses);
        let interval = null;

        if (statuses.length !== 2) {
            return;
        }

        if (statuses.every(({ isGameReady }) => isGameReady)) {
            setCountdown(10);
            socket.sendDisposition(board.extractDisposition(gameState.teams.currentPlayer));
            interval = setInterval(() => {
                setCountdown(prevCount => {
                    if (typeof prevCount !== 'number') {
                        return prevCount;
                    }

                    if (prevCount === 0) {
                        clearInterval(interval);
                        setMode(GameStages.GAME_IN_PROCESS);
                        return null;
                    }

                    return prevCount - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [userStatuses]);

    return (
        <div 
            className='screen__section screen__section_secondary'
            ref={dropRef}
        >
            <section style={{ width: '100%' }}>
                <ul>
                    {session.users.map(({ id }, index) => {
                        const isCurrentUser = id === currentUser.id;
                        const status = userStatuses[id];

                        return (
                            <li>
                                User {index} {isCurrentUser ? '(You)' : ''} {status?.isGameReady ? 'Ready' : 'Not Ready'}
                            </li>
                        );
                    })}
                </ul>
                {gameState.mode !== GameStages.GAME_IN_PROCESS && (
                    <div>
                        <button
                            disabled={isBankNotEmpty || countdown !== null}
                            onClick={onReady}
                        >
                            {currentUserStatus?.isGameReady ? 'Cancel' : 'Ready'}
                        </button>
                    </div>
                )}
                {countdown !== null && (
                    <p>Game will be started in {countdown}...</p>
                )}
            </section>
            <div className={`bank ${isGameInProcess ? 'bank_in-game' : ''}`}>
                {bankArray.map((item, index) => {
                    return (
                        <BankPiece 
                            key={`${item}-${index}`}
                            rankName={item}
                        />
                    );
                })}
            </div>
        </div>
    );
};
