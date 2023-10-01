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

const RootContext = createContext<IRootContextValue>({} as IRootContextValue);

export const RootProvider: React.FC<IContextProps> = ({ children }) => {
    const [bank, setBank] = useState<typeof PIECES_SETUP>(PIECES_SETUP);
    const [selection, setSelection] = useState<ISelectionState | null>(null);
    const [rootState, setRootState] = useState<IRootState>({
        field: [],
        mode: GameStages.SET_PIECES,
    });
	const gameCoreRef = useRef(new GameCore(setRootState));

	useEffect(() => {
		gameCoreRef.current.init();
	}, []);

    return (
        <RootContext.Provider value={{
            ...rootState,
            bank,
            selection,
            setSelection,
            setBank,
            gameCoreRef,
        }}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => {
    return useContext(RootContext);
};