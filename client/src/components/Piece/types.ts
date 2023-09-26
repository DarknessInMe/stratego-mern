import { IPieceBase } from './interfaces';

export type BankPieceTypes = Omit<IPieceBase, 'team' | 'isHidden'>