import { EnvironmentEnum, PieceNameEnum, PieceWeightEnum } from './enums';
import { BasePiece } from 'core/Pieces';
import { BoardFieldType, SetBankType } from './types';
import { GameCore } from 'core/GameCore';

export interface IRootState {
    board: BoardFieldType,
    version: number,
}
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

export interface ICellComponentProps {
    cell: ICell;
}

export interface IContextProps {
    children: React.ReactNode,
}

export interface IRootContextValue {
    board: BoardFieldType,
    bank: PieceNameEnum[],
    setBank: SetBankType,
    gameCoreRef: React.MutableRefObject<GameCore>
}

export interface IBankToBoardDragObject {
    rankName: PieceNameEnum,
}