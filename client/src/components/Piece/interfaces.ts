import { PieceNameEnum, TeamsEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';

export interface IPieceBase {
    rankName: PieceNameEnum,
    team: TeamsEnum,
    isSelected?: boolean,
    className?: string,
}

export interface IPieceProps extends IPieceBase {
    isDragging: boolean,
    isHidden: boolean,
    onMouseDown?: () => void,
}

export interface IBoardPieceProps extends IPieceBase {
    coordinates?: CoordinatesType | null,
    onClick?: () => void;
}