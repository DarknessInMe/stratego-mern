import React, { memo, useMemo } from 'react';
import { withGameInProgressDnD } from './withGameInProgressDnD';
import { withSetPiecesDnD } from './withSetPiecesDnD';
import { withStaticState } from './withStaticState';
import { useGameContext } from 'context/GameContext';
import { GameStages } from 'shared/enums';
import { ICellComponentProps, IDraggableCellProps } from 'shared/interfaces';
import { ReactComponentWithRefType } from 'shared/types';

export const withStagedDnD = (WrappedComponent: ReactComponentWithRefType<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = memo((props) => {
        const { gameState } = useGameContext();
        const actualHoc = useMemo(() => {
            const hocMap = {
                [GameStages.GAME_IN_PROCESS]: withGameInProgressDnD,
                [GameStages.SET_PIECES]: withSetPiecesDnD,
            };

            if (gameState.mode in hocMap) {
                return hocMap[gameState.mode];
            }

            return withStaticState;
        }, [gameState.mode]);

        const ModifiedComponent = actualHoc(WrappedComponent);

        return <ModifiedComponent {...props} />;
    });

    return Component;
};