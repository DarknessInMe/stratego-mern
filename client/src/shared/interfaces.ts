import { EnvironmentEnum } from './enums';

export interface ICell {
    x: number,
    y: number,
    environment: EnvironmentEnum,
    piece: null,
}