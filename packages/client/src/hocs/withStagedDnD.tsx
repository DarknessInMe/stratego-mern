import React, { memo } from 'react';
import { withGameInProgressDnD } from './withGameInProgressDnD';
import { withSetPiecesDnD } from './withSetPiecesDnD';
import { useGameContext } from 'context/GameContext';
import { GameStages } from 'shared/enums';
import { ICellComponentProps, IDraggableCellProps } from 'shared/interfaces';
import { ReactComponentWithRefType } from 'shared/types';

export const withStagedDnD = (WrappedComponent: ReactComponentWithRefType<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = memo((props) => {
        const { gameState } = useGameContext();
        const actualHOC = gameState.mode === GameStages.GAME_IN_PROCESS ? withGameInProgressDnD : withSetPiecesDnD;
        const ModifiedComponent = actualHOC(WrappedComponent);

        return <ModifiedComponent {...props} />;
    });

    return Component;
};