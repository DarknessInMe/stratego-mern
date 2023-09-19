import { BoardFieldType } from 'shared/types';
import { ICell } from 'shared/interfaces';
import { EnvironmentEnum } from 'shared/enums';
import { WATER_POSITION } from './constants';
import { BasePiece } from 'core/Pieces';

export class Board {
    field: BoardFieldType | null = null;
    private readonly updateCoreState: () => void;
    
    constructor(updateCoreState: () => void) {
        this.updateCoreState = updateCoreState;
    }

    initField() {
        this.field = [];

        for (let y = 0; y < 10; y++) {
            const row: ICell[] = [];

            for (let x = 0; x < 10; x++) {
                row.push({ x, y, environment: EnvironmentEnum.LAND, piece: null, });
            }

            this.field.push(row);
        }

        WATER_POSITION.forEach(({ x, y }) => {
            this.field[y][x] = { ...this.field[y][x], environment: EnvironmentEnum.WATER };
        });
    }

    getCell(x: number, y: number) {
        return this.field[y][x];
    }

    private movePieceTo(piece: BasePiece, x: number, y: number) {
        const cell = this.getCell(x, y);

        cell.piece = piece;
        
        piece.moveTo(x, y);
    }

    private nullifyPiece(x: number, y: number) {
        const cell = this.getCell(x, y);

        cell.piece = null;
    }

    addPieceTo(piece: BasePiece, x: number, y: number) {
        this.movePieceTo(piece, x, y);
        this.updateCoreState();
    }

    removePieceFrom(x: number, y: number) {
        this.nullifyPiece(x, y);
        this.updateCoreState();
    }

    dragPiece(piece: BasePiece, x: number, y: number) {
        this.nullifyPiece(piece.x, piece.y);
        this.movePieceTo(piece, x, y);
        this.updateCoreState();
    }

    movePiece(piece: BasePiece, x: number, y: number) {
        if (!piece.isCorrectPath(x, y)) {
            return;
        }

        this.dragPiece(piece, x, y);
    }
}