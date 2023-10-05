import { Board } from 'core/Board';
import { GameStages, PieceNameEnum, TeamsEnum } from 'shared/enums';
import { Player } from 'core/Player';
import { piecePicker } from 'shared/utils';
import { IRootState } from 'shared/interfaces';
import { ReactSetStateType } from 'shared/types';
import { StaticPiece } from 'core/Pieces';

export class GameCore {
    board: Board | null = null;
    mode: GameStages = GameStages.SET_PIECES;
    currentPlayer: Player = new Player(TeamsEnum.RED_TEAM);
    opponentPlayer: Player = new Player(TeamsEnum.BLUE_TEAM);

    private readonly updateExternalState: ReactSetStateType<IRootState>;
    
    constructor(updateExternalState: ReactSetStateType<IRootState>) {
        this.updateExternalState = updateExternalState;
    }

    private setStaticOpponent() {
        const [top, bottom] = this.opponentPlayer.allowedRange;

        for (let y = top; y <= bottom; y++) {
            for (let x = 0; x < 10; x++) {
                const opponentPiece = new StaticPiece(x, y, PieceNameEnum.BOMB, this.opponentPlayer.team);
                const cell = this.board.getCell(x, y);

                this.board.pieces.set(opponentPiece.id, opponentPiece);
                cell.pieceId = opponentPiece.id;
            }
        }
    }

    init() {
        this.board = new Board(this.updateExternalState);
        this.board.initField();
        this.setStaticOpponent();
        this.updateExternalState({
            field: this.board.field,
            mode: this.mode,
        });

        if (process.env.NODE_ENV === 'development') {
            window.spawnOpponent = this.__spawnOpponent__.bind(this);
        }
    }

    toggleMode() {
        this.mode = this.mode === GameStages.SET_PIECES ? GameStages.GAME_IN_PROCESS : GameStages.SET_PIECES;
        this.updateExternalState((prevState) => ({
            ...prevState,
            mode: this.mode,
        }));
    }

    __spawnOpponent__(rankName: PieceNameEnum, x: number, y: number) {
        const Piece = piecePicker(rankName); 

        this.board.registerPiece(new Piece(x, y, rankName, this.opponentPlayer.team), x, y);
    }
}