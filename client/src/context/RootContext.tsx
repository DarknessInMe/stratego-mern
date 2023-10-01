import React, { 
    createContext, 
    useState, 
    useRef, 
    useEffect,
    useContext,
} from 'react';
import { GameCore } from 'core/GameCore';
import { IContextProps, IRootContextValue, IRootState, ISelectionState } from 'shared/interfaces';
import { CELL_ATTRIBUTES, PIECES_SETUP } from 'shared/constants';
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

    const cleanUpHighlight = () => {
        const highlightedItems = document.querySelectorAll('.possible-path');

        highlightedItems.forEach(item => {
            item.classList.remove('possible-path');
        });
    };

	useEffect(() => {
		gameCoreRef.current.init();
	}, []);

    useEffect(() => {
        cleanUpHighlight();

        if (!selection) {
            return;
        }

        selection.possiblePath.forEach(pathItem => {
            const selector = `[${CELL_ATTRIBUTES.X}="${pathItem.x}"][${CELL_ATTRIBUTES.Y}="${pathItem.y}"]`;
            const pathNode = document.querySelector(selector);

            if (pathNode) {
                pathNode.classList.add('possible-path');
            }
        });
    }, [selection]);

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