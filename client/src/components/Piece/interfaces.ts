import { PieceNameEnum } from 'shared/enums';

type CoordinatesType = { x: number, y: number };

export interface IPieceProps {
    rankName: PieceNameEnum,
    className?: string,
    coordinates?: CoordinatesType | null,
}