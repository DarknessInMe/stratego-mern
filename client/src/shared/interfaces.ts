import { EnvironmentEnum, PieceEnum } from './enums';

export interface IReactPiece {
    id: string,
    rank: PieceEnum
}
export interface ICell {
    x: number,
    y: number,
    environment: EnvironmentEnum,
    piece: IReactPiece | null,
}