import { PieceNameEnum } from './enums';
import { ICell } from './interfaces';

export type ReactSetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type BoardFieldType = ICell[][]

export type SetBankType = ReactSetStateType<PieceNameEnum[]>;