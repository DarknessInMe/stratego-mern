import React, { memo } from 'react';
import { Land } from 'components/Land';
import { Water } from 'components/Water';
import { ICellComponentProps } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { BoardPiece } from 'components/Piece';
import { useRootContext } from 'context/RootContext';
import clsx from 'clsx';

export const CellFactory: React.FC<ICellComponentProps> = memo(({ cell }) => {
    const { boardRef, isReversedPlayer } = useRootContext();

    switch(cell.environment) {
        case EnvironmentEnum.WATER: {
            return <Water coordinates={{ x: cell.x, y: cell.y }}/>;
        }
        default: {
            if (!cell.pieceId) {
                return <Land cell={cell} />;
            }

            const piece = boardRef.current.getPieceByCoordinates(cell.x, cell.y);
            
            return (
                <BoardPiece
                    rankName={piece.rankName}
                    team={piece.team}
                    className={clsx('piece_landed', isReversedPlayer && 'piece_reversed')}
                    coordinates={{
                        x: piece.x,
                        y: piece.y
                    }}
                />
            );
        }
    }
});
