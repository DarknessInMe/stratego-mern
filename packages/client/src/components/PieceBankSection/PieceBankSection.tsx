import React, { useMemo } from 'react';
import { BankPiece } from 'components/Piece';
import { useGameContext } from 'context/GameContext';
import { generateInitSetup } from 'shared/utils';
import { useDrop } from 'react-dnd';
import { DragTypesEnum, GameStages, PieceNameEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';
import { useBankControllers } from 'store';
import { useGameCoreControllers } from 'store/game/hooks/useGameCoreControllers';

interface IDrop {
    rankName: PieceNameEnum,
    coordinates: CoordinatesType | null,
}

export const PieceBankSection: React.FC = () => {
    const { gameState, gameDispatch, boardRef } = useGameContext();
    const { addToBank } = useBankControllers(gameDispatch);
    const { toggleMode } = useGameCoreControllers(gameDispatch);

    const isGameInProcess = gameState.mode === GameStages.GAME_IN_PROCESS;
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

    return (
        <div 
            className='screen__section screen__section_secondary'
            ref={dropRef}
        >
            <div className='dev-kit'>
                <button onClick={toggleMode}>Toggle mode</button>
                <span>Current mode: {gameState.mode}</span>
            </div>
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
