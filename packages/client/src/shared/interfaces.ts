import { EnvironmentEnum, PieceNameEnum } from './enums';
import { TeamsEnum, ISession, IUser } from '@stratego/common';
import { 
    BoardFieldType, 
    CoordinatesType, 
    ReactSetStateType, 
    SetBankType, 
} from './types';
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

export interface IDraggableCellProps {
    dropRef?: (node: ConnectableElement) => void,
    isOver?: boolean,
    isHighlighted?: boolean;
    onMouseDown?: () => void;
}

export interface ICellComponentProps {
    cell: ICell;
}

export interface IContextProps {
    children: React.ReactNode,
}

export interface ISelectionState {
    selectedPieceId: string | null,
    attackedPieceId: string | null,
}

export interface IRootContextValue extends IRootState {
    bank: typeof PIECES_SETUP,
    selection: ISelectionState,
    setBank: SetBankType,
    setSelection: ReactSetStateType<ISelectionState>,
    gameCoreRef: React.MutableRefObject<GameCore>,
    isReversedPlayer: boolean,
}

export interface ISessionContextValue {
    session: ISession | null,
    setSession: ReactSetStateType<ISession | null>,
    currentUser: IUser,
    updateUserInSession: (updatedUser: IUser) => void,
    removeUser: (userId: string) => void,
}

export interface IBankToBoardDragObject {
    rankName: PieceNameEnum,
}

export interface IPlayer {
    team: TeamsEnum,
}

export interface IDraggedItem {
    rankName: PieceNameEnum,
    coordinates: CoordinatesType
}
