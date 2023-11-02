import React from 'react';
import { BoardSection } from 'components/BoardSection';
import { PieceBankSection } from 'components/PieceBankSection';
import { GameProvider } from 'context/GameContext';
import clsx from 'clsx';

export const Game = () => {
    return (
        <GameProvider>
            <div className={clsx('screen', 'page')}>
                <BoardSection />
                <PieceBankSection />
            </div>
        </GameProvider>
    );
};
