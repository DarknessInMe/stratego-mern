import React, { 
    createContext, 
    useRef, 
    useEffect,
    useContext,
} from 'react';
import { Board } from 'core/Board';
import { IContextProps, IGameContextValue } from 'shared/interfaces';
import { TeamsEnum } from '@stratego/common';
import { useSessionContext } from './SessionContext';
import { useGameState } from 'store';
import { useSelectionControllers } from 'store/game/hooks/useSelectionControllers';
import { useGameCoreControllers } from 'store/game/hooks/useGameCoreControllers';
import { GameService } from 'services/GameService';
import { Devtools } from 'components/Devtools';

const GameContext = createContext<IGameContextValue>({} as IGameContextValue);
const isDevelopment = process.env.NODE_ENV === 'development';

export const GameProvider: React.FC<IContextProps> = ({ children }) => {
    const { currentUser } = useSessionContext();
    const [gameState, gameDispatch] = useGameState(currentUser);

    const { setField, updateCells, toggleTurn } = useGameCoreControllers(gameDispatch);
    const { dropSelection } = useSelectionControllers(gameDispatch);

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
	const boardRef = useRef(new Board(updateCells));
    const isReversedPlayer = gameState.teams.currentPlayer === TeamsEnum.BLUE_TEAM;
    const isCurrentPlayerTurn = gameState.turn === gameState.teams.currentPlayer;
    
	useEffect(() => {
		boardRef.current.init(setField);

        return () => {
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
            toggleTurn();
        }, 2000);
    }, [gameState.selection.attackerPieceId, gameState.selection.defenderPieceId]);

    return (
        <GameContext.Provider value={{
            isReversedPlayer,
            isCurrentPlayerTurn,
            gameState,
            gameDispatch,
            boardRef,
        }}>
            <GameService />
            {isDevelopment && <Devtools />}
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};