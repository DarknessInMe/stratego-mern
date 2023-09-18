import { Board } from 'core/Board';
import { UpdateExternalStateType } from './types';

/**
 * GameCore class - responsive for initializing/destroying all core entities 
 * Board class - responsive for board render and applying pieces on new positions
 * Piece class - responsive for defining can one piece beat another
 */

export class GameCore {
    board: Board | null = null;
    private version: number = 0;
    private readonly updateExternalState: UpdateExternalStateType;
    
    constructor(updateExternalState: UpdateExternalStateType) {
        this.updateExternalState = updateExternalState;
    }

    init() {
        this.board = new Board(this.update.bind(this));
        this.board.initField();
        this.update();
    }

    update() {
        this.version += 1;
        this.updateExternalState({
            board: this.board.field,
            version: this.version,
        });
    }
}