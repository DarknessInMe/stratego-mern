import React, { memo, useCallback, useMemo } from 'react';
import { Land } from 'components/Land';
import { Water } from 'components/Water';
import { ICellComponentProps } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { BoardPiece } from 'components/Piece';
import { useRootContext } from 'context/RootContext';
import clsx from 'clsx';

export const CellFactory: React.FC<ICellComponentProps> = memo(({ cell }) => {
    const { gameCoreRef, selection, handlePieceMoving } = useRootContext();

    const isSelected = useMemo(() => {
        if (!selection) {
            return false;
        }

        return selection.possiblePath.some(({ x, y }) => cell.x === x && cell.y === y);
    }, [cell.x, cell.y, selection?.possiblePath]);

    const onMoveByClick = useCallback(() => {
        if (!isSelected || !selection) {
            return;
        }

        handlePieceMoving(selection.pieceAt, { x: cell.x, y: cell.y });
    }, [isSelected, selection, handlePieceMoving]);

    switch(cell.environment) {
        case EnvironmentEnum.WATER: {
            return <Water coordinates={{ x: cell.x, y: cell.y }}/>;
        }
        case EnvironmentEnum.LAND: {
            if (!cell.pieceId) {
                return (
                    <Land 
                        cell={cell} 
                        className={isSelected && 'possible-path'}
                        onClick={onMoveByClick}
                    />
                );
            }

            const { board } = gameCoreRef.current;
            const piece = board.getPieceByCoordinates(cell.x, cell.y);
            
            return (
                <BoardPiece
                    rankName={piece.rankName}
                    team={piece.team}
                    className={clsx('piece_landed', isSelected && 'possible-path')}
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
