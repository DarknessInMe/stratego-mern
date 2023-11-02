import React, { useMemo } from 'react';
import { BankPiece } from 'components/Piece';
import { useRootContext } from 'context/RootContext';
import { generateInitSetup } from 'shared/utils';
import { useDrop } from 'react-dnd';
import { DragTypesEnum, GameStages, PieceNameEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';
import { useBankControllers } from 'store';

interface IDrop {
    rankName: PieceNameEnum,
    coordinates: CoordinatesType | null,
}

export const PieceBankSection: React.FC = () => {
    const { gameState, gameDispatch, gameCoreRef, mode } = useRootContext();
    const { addToBank } = useBankControllers(gameDispatch);

    const isGameInProcess = mode === GameStages.GAME_IN_PROCESS;
    const [_, dropRef] = useDrop(() => ({
        accept: DragTypesEnum.PIECE_FROM_BOARD,
        drop: ({ rankName, coordinates }: IDrop) => {
            addToBank(rankName);

            if (coordinates) {
                const { board } = gameCoreRef.current;

                board.destroyPieces([coordinates]);
            }
        },
        canDrop: () => !isGameInProcess,
      }), [mode]);

    const bankArray = useMemo(() => {
        return generateInitSetup(gameState.bank);
    }, [gameState.bank]);

    const toggleMode = () => {
        gameCoreRef.current.toggleMode();
    };

    return (
        <div 
            className='screen__section screen__section_secondary'
            ref={dropRef}
        >
            <div className='dev-kit'>
                <button onClick={toggleMode}>Toggle mode</button>
                <span>Current mode: {mode}</span>
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
