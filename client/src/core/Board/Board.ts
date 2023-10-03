import { BoardFieldType } from 'shared/types';
import { ICell } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { WATER_POSITION } from './constants';
import { BasePiece } from 'core/Pieces';
import { IRootState } from 'shared/interfaces';
import { ReactSetStateType } from 'shared/types';
import clone from 'lodash/clone';

export class Board {
    field: BoardFieldType | null = null;
    pieces = new Map<string, BasePiece>();

    readonly updateCoreState: ReactSetStateType<IRootState>;
    
    constructor(updateCoreState: ReactSetStateType<IRootState>) {
        this.updateCoreState = updateCoreState;
    }

    private updateCells(cells: ICell[]) {
        this.updateCoreState((prevState) => {
            const fieldCopy = clone(prevState.field);

            cells.forEach(cell => {
                fieldCopy[cell.y][cell.x] = cell;
            });

            return {
                ...prevState,
                field: fieldCopy
            };
        });
    }

    initField() {
        this.field = [];

        for (let y = 0; y < 10; y++) {
            const row: ICell[] = [];

            for (let x = 0; x < 10; x++) {
                row.push({ x, y, environment: EnvironmentEnum.LAND, pieceId: null, });
            }

            this.field.push(row);
        }

        WATER_POSITION.forEach(({ x, y }) => {
            this.field[y][x] = { ...this.field[y][x], environment: EnvironmentEnum.WATER };
        });
    }

    getCell(x: number, y: number): ICell | null {
        try {
            return this.field[y][x];
        } catch {
            return null;
        }
    }

    getPieceById(id: string) {
        return this.pieces.get(id);
    }

    getPieceByCoordinates(x: number, y: number) {
        try {
            const cell = this.getCell(x, y);

            return this.getPieceById(cell.pieceId);
        } catch {
            return null;
        }
    }

    registerPiece(piece: BasePiece, x: number, y: number) {
        this.pieces.set(piece.id, piece);

        const cell = this.getCell(x, y);

        cell.pieceId = piece.id;
        this.updateCells([cell]);
    }

    removeAndUnregisterPiece(x: number, y: number) {
        const piece = this.getPieceByCoordinates(x, y);
        const cell = this.removePieceFrom(x, y);

        this.pieces.delete(piece.id);
        this.updateCells([cell]);
    }

    addPieceTo(piece: BasePiece, x: number, y: number) {
        const cell = this.getCell(x, y);

        cell.pieceId = piece.id;
        piece.moveTo(x, y);

        return cell;
    }

    removePieceFrom(x: number, y: number) {
        const cell = this.getCell(x, y);

        cell.pieceId = null;

        return cell;
    }

    movePiece(piece: BasePiece, newX: number, newY: number) {
        const removedFromCell = this.removePieceFrom(piece.x, piece.y);
        const addedToCell = this.addPieceTo(piece, newX, newY);

        this.updateCells([removedFromCell, addedToCell]);
    }
}