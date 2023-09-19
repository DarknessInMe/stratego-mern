import { PieceNameEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';
import { ConnectableElement } from 'react-dnd';
export interface IPieceBase {
    rankName: PieceNameEnum,
    className?: string,
}

export interface IPieceProps extends IPieceBase {
    isDragging: boolean,
    dragRef?: (node: ConnectableElement) => void,
}

export interface IBoardPieceProps extends IPieceBase {
    coordinates?: CoordinatesType | null,
}