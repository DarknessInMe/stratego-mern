import { EnvironmentEnum, PieceNameEnum, PieceWeightEnum } from './enums';
import { BasePiece } from 'core/Pieces';
export interface IPieceRank {
    name: PieceNameEnum,
    weight: PieceWeightEnum,
}

export interface ICell {
    x: number,
    y: number,
    environment: EnvironmentEnum,
    piece: BasePiece | null,
}