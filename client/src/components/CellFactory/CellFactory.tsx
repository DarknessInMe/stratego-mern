import React, { memo } from 'react';
import { Land } from 'components/Land';
import { Water } from 'components/Water';
import { ICellComponentProps } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { BoardPiece } from 'components/Piece';
import { useRootContext } from 'context/RootContext';

export const CellFactory: React.FC<ICellComponentProps> = memo(({ cell }) => {
    const { gameCoreRef } = useRootContext();

    switch(cell.environment) {
        case EnvironmentEnum.WATER: {
            return <Water coordinates={{ x: cell.x, y: cell.y }}/>;
        }
        default: {
            if (!cell.pieceId) {
                return <Land cell={cell} />;
            }

            const { board } = gameCoreRef.current;
            const piece = board.getPieceByCoordinates(cell.x, cell.y);
            
            return (
                <BoardPiece
                    rankName={piece.rankName}
                    team={piece.team}
                    className={'piece_landed'}
                    coordinates={{
                        x: piece.x,
                        y: piece.y
                    }}
                />
            );
        }
    }
});
