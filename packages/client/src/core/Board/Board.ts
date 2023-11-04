import { BoardFieldType, CoordinatesType } from 'shared/types';
import { ICell } from 'shared/interfaces';
import { EnvironmentEnum, FightResultEnum, PieceNameEnum } from 'shared/enums';
import { WATER_POSITION } from './constants';
import { BasePiece } from 'core/Pieces';
import { ALLOWED_SETUP_RANGES } from 'shared/constants';
import { IDispositionItem, TeamsEnum } from '@stratego/common';
import { piecePicker } from 'shared/utils';

type UpdateCoreStateType = (cells: ICell[]) => void;

export class Board {
    field: BoardFieldType | null = null;
    pieces = new Map<string, BasePiece>();

    readonly updateCoreState: UpdateCoreStateType;
    
    constructor(updateCoreState: UpdateCoreStateType) {
        this.updateCoreState = updateCoreState;
    }

    init(callback: (field: BoardFieldType) => void) {
        this.initField();
        callback(this.field);
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

    registerDisposition(disposition: IDispositionItem[], team: TeamsEnum) {
        const cellsToUpdate: ICell[] = [];

        disposition.forEach(({ x, y, rankName, id }) => {
            const nameGuard = rankName as PieceNameEnum;
            const pieceConstructor = piecePicker(nameGuard);
            const piece = new pieceConstructor(x, y, nameGuard, team, id);
            const cell = this.getCell(x, y);

            this.pieces.set(piece.id, piece);
            cell.pieceId = piece.id;

            cellsToUpdate.push(cell);
        });

        this.updateCoreState(cellsToUpdate);
    }

    extractDisposition(team: TeamsEnum): IDispositionItem[] {
        const [start, end] = ALLOWED_SETUP_RANGES[team];

        return this.field.slice(start, end + 1).flat().map(cell => {
            const piece = this.pieces.get(cell.pieceId);

            return {
                x: piece.x,
                y: piece.y,
                rankName: piece.rankName,
                id: piece.id,
            };
        });
    }

    registerPiece(piece: BasePiece, x: number, y: number) {
        this.pieces.set(piece.id, piece);

        const cell = this.getCell(x, y);

        cell.pieceId = piece.id;
        this.updateCoreState([cell]);
    }

    destroyPieces(cellsCoordinates: CoordinatesType[]) {
        const cellsToUpdate: ICell[] = [];

        cellsCoordinates.forEach(({ x, y }) => {
            const piece = this.getPieceByCoordinates(x, y);
            const cell = this.removePieceFrom(x, y);
    
            this.pieces.delete(piece.id);
            cellsToUpdate.push(cell);
        });

        this.updateCoreState(cellsToUpdate);
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
        if (piece.x === newX && piece.y === newY) {
            return;
        }

        const removedFromCell = this.removePieceFrom(piece.x, piece.y);
        const addedToCell = this.addPieceTo(piece, newX, newY);

        this.updateCoreState([removedFromCell, addedToCell]);
    }

    private getClosestPosition(attackerPosition: number, targetPosition: number) {
        const diff = Math.abs(attackerPosition - targetPosition) - 1;
        const directionMultiplier = attackerPosition > targetPosition ? -1 : 1;

        return attackerPosition + (diff * directionMultiplier);
    }

    initAttack(attackerPieceId: string, targetPieceId: string) {
        const targetPiece = this.getPieceById(targetPieceId);
        const attackerPiece = this.getPieceById(attackerPieceId);

        if (targetPiece.x === attackerPiece.x) {
            return this.movePiece(attackerPiece, attackerPiece.x, this.getClosestPosition(attackerPiece.y, targetPiece.y));
        }

        if (targetPiece.y === attackerPiece.y) {
            return this.movePiece(attackerPiece, this.getClosestPosition(attackerPiece.x, targetPiece.x), attackerPiece.y);
        }
    }

    applyAttackResult(attackerPieceId: string, targetPieceId: string) {
        const targetPiece = this.getPieceById(targetPieceId);
        const attackerPiece = this.getPieceById(attackerPieceId);
        const fightResult = attackerPiece.canBeat(targetPiece.rankName);

        switch(fightResult) {
            case FightResultEnum.DEFEAT: {
                this.destroyPieces([attackerPiece]);
                break;
            }
            case FightResultEnum.STALEMATE: {
                this.destroyPieces([attackerPiece, targetPiece]);
                break;
            }
            case FightResultEnum.VICTORY: {
                this.destroyPieces([targetPiece]);
                this.movePiece(attackerPiece, targetPiece.x, targetPiece.y);
                break;
            };
        }

        return fightResult;
    }
}