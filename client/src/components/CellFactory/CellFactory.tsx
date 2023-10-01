import React, { memo, useMemo } from 'react';
import { Land } from 'components/Land';
import { Water } from 'components/Water';
import { ICellComponentProps } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { BoardPiece } from 'components/Piece';
import { useRootContext } from 'context/RootContext';
import { isSelectedByPossiblePath } from 'shared/utils';

export const CellFactory: React.FC<ICellComponentProps> = memo(({ cell }) => {
    const { gameCoreRef, selection } = useRootContext();

    const isSelected = useMemo(() => {
        if (!selection) {
            return false;
        }

        return isSelectedByPossiblePath(selection.possiblePath, cell);
    }, [cell.x, cell.y, selection?.possiblePath]);

    switch(cell.environment) {
        case EnvironmentEnum.WATER: {
            return <Water coordinates={{ x: cell.x, y: cell.y }}/>;
        }
        case EnvironmentEnum.LAND: {
            if (!cell.pieceId) {
                return (
                    <Land 
                        cell={cell} 
                        isSelected={isSelected}
                    />
                );
            }

            const { board } = gameCoreRef.current;
            const piece = board.getPieceByCoordinates(cell.x, cell.y);
            
            return (
                <BoardPiece
                    rankName={piece.rankName}
                    team={piece.team}
                    className={'piece_landed'}
                    isSelected={isSelected}
                    coordinates={{
                        x: piece.x,
                        y: piece.y
                    }}
                />
            );
        }
        default: {
            return null;
        }
    }
});
