import React from 'react';
import { Land } from 'ui/Land';
import { Water } from 'ui/Water';
import { ICellFactory } from './interfaces';
import { EnvironmentEnum } from 'shared/enums';

export const CellFactory: React.FC<ICellFactory> = ({ cell }) => {
    switch(cell.environment) {
        case EnvironmentEnum.WATER: {
            return <Water />;
        }
        case EnvironmentEnum.LAND: {
            return <Land />;
        }
        default: {
            return null;
        }
    }
};
