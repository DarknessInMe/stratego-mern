import { BoardFieldType } from 'shared/types';
import { ICell } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { WATER_POSITION } from './constants';
import { BasePiece } from 'core/Pieces';

export class Board {
    field: BoardFieldType | null = null;
    pieces = new Map<string, BasePiece>();

    readonly updateCoreState: () => void;
    
    constructor(updateCoreState: () => void) {
        this.updateCoreState = updateCoreState;
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
    }

    removeAndUnregisterPiece(x: number, y: number) {
        const piece = this.getPieceByCoordinates(x, y);

        this.pieces.delete(piece.id);
        this.removePieceFrom(x, y);
        this.updateCoreState();
    }

    addPieceTo(piece: BasePiece, x: number, y: number) {
        const cell = this.getCell(x, y);

        cell.pieceId = piece.id;
        piece.moveTo(x, y);
    }

    removePieceFrom(x: number, y: number) {
        const cell = this.getCell(x, y);

        cell.pieceId = null;
    }

    movePiece(piece: BasePiece, newX: number, newY: number) {
        this.removePieceFrom(piece.x, piece.y);
        this.addPieceTo(piece, newX, newY);
        this.updateCoreState();
    }
}