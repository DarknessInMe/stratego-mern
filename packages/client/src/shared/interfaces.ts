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
import { ControllersType, IGameState } from 'store';

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

export interface IPlayersState {
    currentPlayer: IPlayer,
    opponentPlayer: IPlayer,
}

export interface IRootContextValue extends IRootState {
    selection: ISelectionState,
    setSelection: ReactSetStateType<ISelectionState>,
    gameCoreRef: React.MutableRefObject<GameCore>,
    isReversedPlayer: boolean,
    gameState: IGameState,
    stateControllers: ControllersType,
}

export interface ISessionContextValue {
    session: ISession | null,
    setSession: ReactSetStateType<ISession | null>,
    currentUser: IUser,
    handleUserUpdating: (updatedUser: IUser) => void,
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
