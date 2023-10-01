import { Board } from 'core/Board';
import { UpdateExternalStateType } from './types';
import { GameStages, PieceNameEnum, TeamsEnum } from 'shared/enums';
import { Player } from 'core/Player';
import { piecePicker } from 'shared/utils';

export class GameCore {
    board: Board | null = null;
    mode: GameStages = GameStages.SET_PIECES;
    currentPlayer: Player = new Player(TeamsEnum.RED_TEAM);
    opponentPlayer: Player = new Player(TeamsEnum.BLUE_TEAM);

    private readonly updateExternalState: UpdateExternalStateType;
    
    constructor(updateExternalState: UpdateExternalStateType) {
        this.updateExternalState = updateExternalState;
    }

    init() {
        this.board = new Board(this.update.bind(this));
        this.board.initField();
        this.update();

        if (process.env.NODE_ENV === 'development') {
            window.spawnOpponent = this.__spawnOpponent__.bind(this);
        }
    }

    update() {
        this.updateExternalState({
            field: this.board.field,
            mode: this.mode,
        });
    }

    toggleMode() {
        this.mode = this.mode === GameStages.SET_PIECES ? GameStages.GAME_IN_PROCESS : GameStages.SET_PIECES;
        this.update();
    }

    __spawnOpponent__(rankName: PieceNameEnum, x: number, y: number) {
        const Piece = piecePicker(rankName); 

        this.board.registerPiece(new Piece(x, y, rankName, this.opponentPlayer.team), x, y);
    }
}