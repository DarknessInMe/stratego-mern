import React from 'react';
import { withGameInProgressDnD } from './withGameInProgressDnD';
import { withSetPiecesDnD } from './withSetPiecesDnD';
import { useRootContext } from 'context/RootContext';
import { GameStages } from 'shared/enums';
import { ICellComponentProps, IDraggableCellProps } from 'shared/interfaces';

export const withStagedDnD = (WrappedComponent: React.FC<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = (props) => {
        const { mode } = useRootContext();
        const actualHOC = mode === GameStages.GAME_IN_PROCESS ? withGameInProgressDnD : withSetPiecesDnD;
        const ModifiedComponent = actualHOC(WrappedComponent);

        return <ModifiedComponent {...props} />;
    };

    return Component;
};