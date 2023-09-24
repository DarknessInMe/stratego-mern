import React from 'react';
import { Land } from 'components/Land';
import { Water } from 'components/Water';
import { ICellComponentProps } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { BoardPiece } from 'components/Piece';

export const CellFactory: React.FC<ICellComponentProps> = ({ cell }) => {
    switch(cell.environment) {
        case EnvironmentEnum.WATER: {
            return <Water />;
        }
        case EnvironmentEnum.LAND: {
            return cell.piece ? (
                <BoardPiece 
                    rankName={cell.piece.rank.name}
                    className='piece_landed'
                    coordinates={{
                        x: cell.piece.x,
                        y: cell.piece.y
                    }}
                />
            ): <Land cell={cell} />;
        }
        default: {
            return null;
        }
    }
};
