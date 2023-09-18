import { PIECES_SETUP } from './constants';
import { ICell } from './interfaces';

export type ReactSetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type BoardFieldType = ICell[][]

export type SetBankType = ReactSetStateType<typeof PIECES_SETUP>;