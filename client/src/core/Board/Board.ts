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

    addPieceTo(piece: BasePiece, x: number, y: number, triggerUpdate: boolean = true) {
        const cell = this.getCell(x, y);

        cell.piece = piece;
        piece.moveTo(x, y);

        triggerUpdate && this.updateCoreState();
    }

    removePieceFrom(x: number, y: number, triggerUpdate: boolean = true) {
        const cell = this.getCell(x, y);

        cell.piece = null;

        triggerUpdate && this.updateCoreState();
    }

    movePiece(piece: BasePiece, x: number, y: number, checkPath: boolean = true) {
        if (checkPath && !piece.isCorrectPath(x, y)) {
            return;
        }

        this.removePieceFrom(piece.x, piece.y, false);
        this.addPieceTo(piece, x, y, false);
        this.updateCoreState();
    }
}