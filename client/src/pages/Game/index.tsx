import React from 'react';
import { BoardSection } from 'components/BoardSection';
import { PieceBankSection } from 'components/PieceBankSection';
import { RootProvider } from 'context/RootContext';
import clsx from 'clsx';

export const Game = () => {
    return (
        <RootProvider>
            <div className={clsx('screen', 'page')}>
                <BoardSection />
                <PieceBankSection />
            </div>
        </RootProvider>
    );
};
