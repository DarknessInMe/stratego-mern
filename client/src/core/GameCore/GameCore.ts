import { Board } from 'core/Board';
import { UpdateExternalStateType } from './types';

/**
 * GameCore class - responsive for initializing/destroying all core entities 
 * Board class - responsive for board render and applying pieces on new positions
 * Piece class - responsive for defining can one piece beat another
 */

export class GameCore {
    board: Board | null = null;
    private readonly updateExternalState: UpdateExternalStateType;

    constructor(updateExternalState: UpdateExternalStateType) {
        this.updateExternalState = updateExternalState;
    }

    init() {
        this.board = new Board();
        this.board.initField();

        this.updateExternalState(this.board.field);
    }
}