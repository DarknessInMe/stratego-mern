import { BoardFieldType } from 'shared/types';
import { ICell } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { WATER_POSITION } from './constants';

export class Board {
    field: BoardFieldType | null = null;

    initField() {
        this.field = [];

        for (let y = 0; y < 10; y++) {
            const row: ICell[] = [];

            for (let x = 0; x < 10; x++) {
                row.push({ x, y, environment: EnvironmentEnum.LAND, piece: null, });
            }

            this.field.push(row);
        }

        WATER_POSITION.forEach(({ x, y }) => {
            this.field[y][x] = { ...this.field[y][x], environment: EnvironmentEnum.WATER };
        });
    }
}