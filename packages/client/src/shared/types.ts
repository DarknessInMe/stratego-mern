import { forwardRef } from 'react';
import { PIECES_SETUP } from './constants';
import { ICell } from './interfaces';

export type ReactSetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type BoardFieldType = ICell[][]

export type SetBankType = ReactSetStateType<typeof PIECES_SETUP>;

export type CoordinatesType = { x: number, y: number };

export type HandlePieceMovingType = (pieceQuery: string | CoordinatesType, newPosition: CoordinatesType) => void;

export type CanMoveBoardPieceTo = (movedFrom: CoordinatesType, moveTo: CoordinatesType) => boolean;

export type OnMoveByClick = (cellPosition: CoordinatesType) => void;

export type ReactComponentWithRefType<Props, Ref extends HTMLElement = HTMLDivElement> = ReturnType<typeof forwardRef<Ref, Props>>;

export type NullableType<T> = T | null;