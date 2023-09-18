import React, { 
    createContext, 
    useState, 
    useRef, 
    useEffect,
    useContext,
} from 'react';
import { GameCore } from 'core/GameCore';
import { IContextProps, IRootContextValue, IRootState } from 'shared/interfaces';
import { generateInitSetup } from 'shared/utils';
import { PieceNameEnum } from 'shared/enums';

const RootContext = createContext<IRootContextValue>({} as IRootContextValue);

export const RootProvider: React.FC<IContextProps> = ({ children }) => {
    const [bank, setBank] = useState<PieceNameEnum[]>(generateInitSetup());
    const [rootState, setRootState] = useState<IRootState>({
        board: [],
        version: 0,
    });
	const gameCoreRef = useRef(new GameCore(setRootState));

	useEffect(() => {
		gameCoreRef.current.init();
	}, []);

    return (
        <RootContext.Provider value={{
            board: rootState.board,
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