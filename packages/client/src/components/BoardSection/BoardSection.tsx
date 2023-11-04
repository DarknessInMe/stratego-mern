import React, { memo, Fragment } from 'react';
import { CellFactory } from 'components/CellFactory';
import { useGameContext } from 'context/GameContext';
import clsx from 'clsx';
import { GameStages } from 'shared/enums';
import { WarFog } from 'components/WarFog';

export const BoardSection: React.FC = memo(() => {
    const { gameState, isReversedPlayer } = useGameContext();
    const isSetupStage = gameState.mode !== GameStages.GAME_IN_PROCESS;

    return (
        <div className={clsx(
            'screen__section', 
            'screen__section_main',
            isSetupStage && 'screen__section_eclipsed'
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
                {isSetupStage && (
                    <WarFog 
                        opponentPlayer={gameState.teams.opponentPlayer}
                        isReversed={isReversedPlayer}
                    />
                )}
            </div>
        </div>
    );
});
