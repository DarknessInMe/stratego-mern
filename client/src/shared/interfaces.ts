import { EnvironmentEnum, PieceNameEnum, TeamsEnum } from './enums';
import { BoardFieldType, CoordinatesType, ReactSetStateType, SetBankType } from './types';
import { GameCore } from 'core/GameCore';
import { PIECES_SETUP } from 'shared/constants';
import { GameStages } from 'shared/enums';
import { ConnectableElement } from 'react-dnd';

export interface IRootState {
    field: BoardFieldType,
    mode: GameStages,
}

export interface ICell {
    x: number,
    y: number,
    environment: EnvironmentEnum,
    pieceId: string | null,
}

export interface ICellComponentProps {
    cell: ICell;
}

export interface IDraggableCellProps extends ICellComponentProps {
    dropRef?: (node: ConnectableElement) => void,
    isOver?: boolean
}

export interface IContextProps {
    children: React.ReactNode,
}

export interface ISelectionState {
    pieceAt: CoordinatesType,
    possiblePath: CoordinatesType[],
}

export interface IRootContextValue extends IRootState {
    bank: typeof PIECES_SETUP,
    selection: ISelectionState,
    setBank: SetBankType,
    setSelection: ReactSetStateType<ISelectionState>,
    gameCoreRef: React.MutableRefObject<GameCore>
}

export interface IBankToBoardDragObject {
    rankName: PieceNameEnum,
}

export interface IPlayer {
    team: TeamsEnum,
}
