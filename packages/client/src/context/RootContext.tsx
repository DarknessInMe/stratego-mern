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

const RootContext = createContext<IRootContextValue>({} as IRootContextValue);

export const RootProvider: React.FC<IContextProps> = ({ children }) => {
    const [bank, setBank] = useState<typeof PIECES_SETUP>(PIECES_SETUP);
    const [selection, setSelection] = useState<ISelectionState>({
        selectedPieceId: null,
        attackedPieceId: null,
    });
    const [rootState, setRootState] = useState<IRootState>({
        field: [],
        mode: GameStages.SET_PIECES,
    });
	const gameCoreRef = useRef(new GameCore(setRootState));
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