import React, { 
    createContext, 
    useState, 
    useRef, 
    useEffect,
    useContext,
} from 'react';
import { GameCore } from 'core/GameCore';
import { IContextProps, IRootContextValue, IRootState, ISelectionState } from 'shared/interfaces';
import { PIECES_SETUP } from 'shared/constants';
import { GameStages } from 'shared/enums';
import { TeamsEnum } from '@stratego/common';
import { useSessionContext } from './SessionContext';

const RootContext = createContext<IRootContextValue>({} as IRootContextValue);

/**
 * TODO:
 * 1. Get rid of GameCore class, all it's properties (except Board, which must kept in ref) move to React states
 * 2. Unite all states into single useReducer state
 * 3. Get rid of piece registering in `setStaticOpponent` method 
 * 4. Rename RootProvider to GameProvider
 */
export const RootProvider: React.FC<IContextProps> = ({ children }) => {
    const { currentUser } = useSessionContext();
    const [bank, setBank] = useState<typeof PIECES_SETUP>(PIECES_SETUP);
    const [selection, setSelection] = useState<ISelectionState>({
        selectedPieceId: null,
        attackedPieceId: null,
    });
    const [rootState, setRootState] = useState<IRootState>({
        field: [],
        mode: GameStages.SET_PIECES,
    });
	const gameCoreRef = useRef(new GameCore(setRootState, currentUser.team));
    const { board, currentPlayer } = gameCoreRef.current;
    const isReversedPlayer = currentPlayer.team === TeamsEnum.BLUE_TEAM;
    
	useEffect(() => {
		gameCoreRef.current.init();
	}, []);

    useEffect(() => {
        const { attackedPieceId, selectedPieceId } = selection;

        if (!attackedPieceId) {
            return;
        }

        board.initAttack(selectedPieceId, attackedPieceId);

        setTimeout(() => {
            board.applyAttackResult(selectedPieceId, attackedPieceId);

            setSelection({
                attackedPieceId: null,
                selectedPieceId: null
            });
        }, 2000);
    }, [selection.attackedPieceId]);

    return (
        <RootContext.Provider value={{
            ...rootState,
            bank,
            selection,
            setSelection,
            setBank,
            gameCoreRef,
            isReversedPlayer,
        }}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => {
    return useContext(RootContext);
};