import React, { 
    createContext, 
    useRef, 
    useEffect,
    useContext,
} from 'react';
import { Board } from 'core/Board';
import { IContextProps, IGameContextValue } from 'shared/interfaces';
import { IDispositionItem, IPieceMovePayload, RESPONSE_EVENTS, TeamsEnum } from '@stratego/common';
import { useSessionContext } from './SessionContext';
import { useGameState } from 'store';
import { useSelectionControllers } from 'store/game/hooks/useSelectionControllers';
import { useGameCoreControllers } from 'store/game/hooks/useGameCoreControllers';
import { socket } from 'socket';
import { Devtools } from 'components/Devtools';

const GameContext = createContext<IGameContextValue>({} as IGameContextValue);
const isDevelopment = process.env.NODE_ENV === 'development';

export const GameProvider: React.FC<IContextProps> = ({ children }) => {
    const { currentUser } = useSessionContext();
    const [gameState, gameDispatch] = useGameState(currentUser);

    const { setField, updateCells } = useGameCoreControllers(gameDispatch);
    const { dropSelection, attackPiece } = useSelectionControllers(gameDispatch);

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
	const boardRef = useRef(new Board(updateCells));
    const isReversedPlayer = gameState.teams.currentPlayer === TeamsEnum.BLUE_TEAM;

    const onDispositionReceiver = (disposition: IDispositionItem[]) => {
        boardRef.current.registerDisposition(disposition, gameState.teams.opponentPlayer);
    };

    const onPieceMoved = (movingPayload: IPieceMovePayload) => {
        const { to, id } = movingPayload;
        const targetCell = boardRef.current.getCell(to.x, to.y);
        const movedPiece = boardRef.current.getPieceById(id);

        if (targetCell.pieceId) {
            return attackPiece({
                attackerPieceId: movedPiece.id,
                defenderPieceId: targetCell.pieceId,
            });
        }

        boardRef.current.movePiece(movedPiece, to.x, to.y);
    };

	useEffect(() => {
		boardRef.current.init(setField);
        socket.root.on(RESPONSE_EVENTS.ON_DISPOSITION_RECEIVED, onDispositionReceiver);
        socket.root.on(RESPONSE_EVENTS.ON_PIECE_MOVED, onPieceMoved);

        return () => {
            socket.root.off(RESPONSE_EVENTS.ON_DISPOSITION_RECEIVED, onDispositionReceiver);
            socket.root.off(RESPONSE_EVENTS.ON_PIECE_MOVED, onPieceMoved);
            clearTimeout(timeoutRef.current);
        };
	}, []);

    useEffect(() => {
        const { attackerPieceId, defenderPieceId } = gameState.selection;

        if (!defenderPieceId || !attackerPieceId) {
            return;
        }

        boardRef.current.initAttack(attackerPieceId, defenderPieceId);

        timeoutRef.current = setTimeout(() => {
            boardRef.current.applyAttackResult(attackerPieceId, defenderPieceId);
            dropSelection();
        }, 2000);
    }, [gameState.selection.attackerPieceId, gameState.selection.defenderPieceId]);

    return (
        <GameContext.Provider value={{
            isReversedPlayer,
            gameState,
            gameDispatch,
            boardRef,
        }}>
            {isDevelopment && <Devtools />}
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};