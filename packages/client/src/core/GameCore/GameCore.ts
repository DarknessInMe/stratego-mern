import { Board } from 'core/Board';
import { IRootState } from 'shared/interfaces';
import { ReactSetStateType } from 'shared/types';

export class GameCore {
    board: Board | null = null;

    private readonly updateExternalState: ReactSetStateType<IRootState>;
    
    constructor(updateExternalState: ReactSetStateType<IRootState>) {
        this.updateExternalState = updateExternalState;
    }

    // private setStaticOpponent() {
    //     const [top, bottom] = this.opponentPlayer.allowedRange;

    //     for (let y = top; y <= bottom; y++) {
    //         for (let x = 0; x < 10; x++) {
    //             const opponentPiece = new StaticPiece(x, y, PieceNameEnum.BOMB, this.opponentPlayer.team);
    //             const cell = this.board.getCell(x, y);

    //             this.board.pieces.set(opponentPiece.id, opponentPiece);
    //             cell.pieceId = opponentPiece.id;
    //         }
    //     }
    // }

    init() {
        this.board = new Board(this.updateExternalState);
        this.board.initField();
        this.updateExternalState({
            field: this.board.field,
        });

        // if (process.env.NODE_ENV === 'development') {
        //     window.spawnOpponent = this.__spawnOpponent__.bind(this);
        // }
    }

    // __spawnOpponent__(rankName: PieceNameEnum, x: number, y: number) {
    //     const Piece = piecePicker(rankName); 

    //     this.board.registerPiece(new Piece(x, y, rankName, this.opponentPlayer.team), x, y);
    // }
}