import { EnvironmentEnum, PieceNameEnum } from './enums';
import { TeamsEnum, ISession, IUser } from '@stratego/common';
import { 
    CoordinatesType, 
    ReactSetStateType, 
} from './types';
import { ConnectableElement } from 'react-dnd';
import { GameStateDispatchType, IGameState } from 'store';
import { Board } from 'core/Board';

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

export interface ITeamsState {
    currentPlayer: TeamsEnum,
    opponentPlayer: TeamsEnum,
}

export interface IRootContextValue {
    boardRef: React.MutableRefObject<Board>,
    isReversedPlayer: boolean,
    gameState: IGameState,
    gameDispatch: GameStateDispatchType,
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

export interface IDraggedItem {
    rankName: PieceNameEnum,
    coordinates: CoordinatesType
}
