import React, { 
    createContext, 
    useState, 
    useRef, 
    useEffect,
    useContext,
} from 'react';
import { GameCore } from 'core/GameCore';
import { IContextProps, IRootContextValue, IRootState } from 'shared/interfaces';
import { PIECES_SETUP } from 'shared/constants';
import { GameStages } from 'shared/enums';

const RootContext = createContext<IRootContextValue>({} as IRootContextValue);

export const RootProvider: React.FC<IContextProps> = ({ children }) => {
    const [bank, setBank] = useState<typeof PIECES_SETUP>(PIECES_SETUP);
    const [rootState, setRootState] = useState<IRootState>({
        field: [],
        version: 0,
        mode: GameStages.SET_PIECES,
    });
	const gameCoreRef = useRef(new GameCore(setRootState));

	useEffect(() => {
		gameCoreRef.current.init();
	}, []);

    return (
        <RootContext.Provider value={{
            field: rootState.field,
            mode: rootState.mode,
            bank,
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