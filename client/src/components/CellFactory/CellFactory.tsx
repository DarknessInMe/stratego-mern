import React from 'react';
import { Land } from 'components/Land';
import { Water } from 'components/Water';
import { ICellComponentProps } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { BoardPiece } from 'components/Piece';
import { useRootContext } from 'context/RootContext';

export const CellFactory: React.FC<ICellComponentProps> = ({ cell }) => {
    const { gameCoreRef } = useRootContext();

    switch(cell.environment) {
        case EnvironmentEnum.WATER: {
            return (
                <Water
                    // key={`water-cell-${cell.x}-${cell.y}`}
                    coordinates={{
                        x: cell.x,
                        y: cell.y
                    }}
                />
            );
        }
        case EnvironmentEnum.LAND: {
            if (!cell.pieceId) {
                return (
                    <Land
                        // key={`land-cell-${cell.x}-${cell.y}`}
                        cell={cell} 
                    />
                );
            }

            const { board } = gameCoreRef.current;
            const piece = board.getPieceByCoordinates(cell.x, cell.y);
            
            return (
                <BoardPiece
                    // key={`piece-cell-${piece.id}`} 
                    rankName={piece.rankName}
                    team={piece.team}
                    className='piece_landed'
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
};
