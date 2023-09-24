import { EnvironmentEnum, PieceNameEnum, PieceWeightEnum } from './enums';
import { BasePiece } from 'core/Pieces';
import { BoardFieldType, SetBankType } from './types';
import { GameCore } from 'core/GameCore';
import { PIECES_SETUP } from 'shared/constants';
import { GameStages } from 'shared/enums';
import { ConnectableElement } from 'react-dnd';

export interface IRootState {
    field: BoardFieldType,
    version: number,
    mode: GameStages,
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

export interface IDraggableCellProps extends ICellComponentProps {
    dropRef: (node: ConnectableElement) => void,
    isOver?: boolean
}

export interface IContextProps {
    children: React.ReactNode,
}

type RootStateOmitted = Omit<IRootState, 'version'>

export interface IRootContextValue extends RootStateOmitted {
    bank: typeof PIECES_SETUP,
    setBank: SetBankType,
    gameCoreRef: React.MutableRefObject<GameCore>
}

export interface IBankToBoardDragObject {
    rankName: PieceNameEnum,
}