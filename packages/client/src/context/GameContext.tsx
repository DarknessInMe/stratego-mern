import React, { 
    createContext, 
    useRef, 
    useEffect,
    useContext,
} from 'react';
import { Board } from 'core/Board';
import { IContextProps, IGameContextValue } from 'shared/interfaces';
import { IDispositionItem, RESPONSE_EVENTS, TeamsEnum } from '@stratego/common';
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
    const { dropSelection } = useSelectionControllers(gameDispatch);

	const boardRef = useRef(new Board(updateCells));
    const isReversedPlayer = gameState.teams.currentPlayer === TeamsEnum.BLUE_TEAM;

    const onDispositionReceiver = (disposition: IDispositionItem[]) => {
        boardRef.current.registerDisposition(disposition, gameState.teams.opponentPlayer);
    };

	useEffect(() => {
		boardRef.current.init(setField);
        socket.root.on(RESPONSE_EVENTS.ON_DISPOSITION_RECEIVED, onDispositionReceiver);

        return () => {
            socket.root.off(RESPONSE_EVENTS.ON_DISPOSITION_RECEIVED, onDispositionReceiver);
        };
	}, []);

    useEffect(() => {
        const { attackedPieceId, selectedPieceId } = gameState.selection;

        if (!attackedPieceId) {
            return;
        }

        boardRef.current.initAttack(selectedPieceId, attackedPieceId);

        setTimeout(() => {
            boardRef.current.applyAttackResult(selectedPieceId, attackedPieceId);
            dropSelection();
        }, 2000);
    }, [gameState.selection.attackedPieceId]);

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