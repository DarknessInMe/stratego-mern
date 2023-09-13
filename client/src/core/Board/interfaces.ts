import { EnvironmentEnum } from 'shared/enums';

export interface ICell {
    x: number,
    y: number,
    environment: EnvironmentEnum,
    piece: null,
}