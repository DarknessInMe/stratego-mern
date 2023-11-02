import React, { memo, Fragment } from 'react';
import { CellFactory } from 'components/CellFactory';
import { useGameContext } from 'context/GameContext';
import clsx from 'clsx';
import { GameStages } from 'shared/enums';
import { WarFog } from 'components/WarFog';

export const BoardSection: React.FC = memo(() => {
    const { gameState, isReversedPlayer } = useGameContext();
    const isSetPiecesStage = gameState.mode === GameStages.SET_PIECES;

    return (
        <div className={clsx(
            'screen__section', 
            'screen__section_main',
            isSetPiecesStage && 'screen__section_eclipsed'
        )}>
            <div className={clsx('board', isReversedPlayer && 'board_reversed')}>
                {gameState.field.map((row, lineIndex) => (
                    <Fragment
                        key={`row-${lineIndex}`}
                    >
                        {row.map((cell, cellIndex) => (
                            <CellFactory
                                key={`cell-${cellIndex}`}
                                cell={cell}
                            />
                        ))}
                    </Fragment>
                ))}
                {isSetPiecesStage && (
                    <WarFog 
                        opponentPlayer={gameState.teams.opponentPlayer}
                        isReversed={isReversedPlayer}
                    />
                )}
            </div>
        </div>
    );
});
