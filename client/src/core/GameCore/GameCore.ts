import { Board } from 'core/Board';
import { UpdateExternalStateType } from './types';
import { GameStages, TeamsEnum } from 'shared/enums';
import { Player } from 'core/Player';

/**
 * GameCore class - responsive for initializing/destroying all core entities 
 * Board class - responsive for board render and applying pieces on new positions
 * Piece class - responsive for defining can one piece beat another
 */

export class GameCore {
    board: Board | null = null;
    mode: GameStages = GameStages.SET_PIECES;
    currentPlayer: Player = new Player(TeamsEnum.RED_TEAM);
    opponentPlayer: Player = new Player(TeamsEnum.BLUE_TEAM);
    
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
            field: this.board.field,
            version: this.version,
            mode: this.mode,
        });
    }

    toggleMode() {
        this.mode = this.mode === GameStages.SET_PIECES ? GameStages.GAME_IN_PROCESS : GameStages.SET_PIECES;

        this.updateExternalState({
            field: this.board.field,
            version: this.version,
            mode: this.mode,
        });
    }
}