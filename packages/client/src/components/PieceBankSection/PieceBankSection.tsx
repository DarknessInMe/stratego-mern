import React, { memo, useMemo } from 'react';
import { BankPiece } from 'components/Piece';
import { useGameContext } from 'context/GameContext';
import { generateInitSetup } from 'shared/utils';
import { useDrop } from 'react-dnd';
import { DragTypesEnum, GameStages, PieceNameEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';
import { useBankControllers, useGameCoreControllers } from 'store';
import { useSessionContext } from 'context/SessionContext';
import { useControllers } from 'hooks/useControllers';
import { useGameStartCountDown } from './hooks/useGameStartCountdown';

interface IDrop {
    rankName: PieceNameEnum,
    coordinates: CoordinatesType | null,
}

export const PieceBankSection: React.FC = memo(() => {
    const { session, currentUser, userStatuses } = useSessionContext();
    const { gameState, gameDispatch, boardRef } = useGameContext();

    const { onToggleGame } = useControllers(); 
    const { addToBank } = useBankControllers(gameDispatch);
    const { setMode } = useGameCoreControllers(gameDispatch);

    const isGameInProcess = gameState.mode === GameStages.GAME_IN_PROCESS;
    const currentUserStatus = userStatuses[currentUser.id];
    const isBankNotEmpty = Object.values(gameState.bank).some(count => count !== 0);
    const board = boardRef.current;

    const bankArray = useMemo(() => {
        return generateInitSetup(gameState.bank);
    }, [gameState.bank]);

    const isGameReady = useMemo(() => {
        const statuses = Object.values(userStatuses);

        return statuses.length === 2 && statuses.every(({ isGameReady }) => isGameReady);
    }, [userStatuses]);

    const { countdown } = useGameStartCountDown(isGameReady); 
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

    const onReady = () => {
        onToggleGame();
        setMode(gameState.mode === GameStages.SET_PIECES ? GameStages.READY : GameStages.SET_PIECES);
    };

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
                            <li key={`user-status-${id}`}>
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
});
