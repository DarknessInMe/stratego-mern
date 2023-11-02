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

const GameContext = createContext<IGameContextValue>({} as IGameContextValue);

/**
 * TODO:
 * 1. Get rid of piece registering in `setStaticOpponent` method 
 */
export const GameProvider: React.FC<IContextProps> = ({ children }) => {
    const { currentUser } = useSessionContext();
    const [gameState, gameDispatch] = useGameState(currentUser);

    const { setField, updateCells } = useGameCoreControllers(gameDispatch);
    const { dropSelection } = useSelectionControllers(gameDispatch);

	const boardRef = useRef(new Board(updateCells));
    const isReversedPlayer = gameState.teams.currentPlayer === TeamsEnum.BLUE_TEAM;
    
	useEffect(() => {
		boardRef.current.init(setField);
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
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};