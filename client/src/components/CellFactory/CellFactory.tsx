import React from 'react';
import { Land } from 'ui/Land';
import { Water } from 'ui/Water';
import { ICellComponentProps } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { Piece } from 'components/Piece';

export const CellFactory: React.FC<ICellComponentProps> = ({ cell }) => {
    switch(cell.environment) {
        case EnvironmentEnum.WATER: {
            return <Water />;
        }
        case EnvironmentEnum.LAND: {
            console.log(cell.piece);
            return cell.piece ? <Piece rankName={cell.piece.rank.name} /> : <Land cell={cell} />;
        }
        default: {
            return null;
        }
    }
};
