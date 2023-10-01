import React, { 
    createContext, 
    useState, 
    useRef, 
    useEffect,
    useContext,
    useCallback,
} from 'react';
import { GameCore } from 'core/GameCore';
import { IContextProps, IRootContextValue, IRootState, ISelectionState } from 'shared/interfaces';
import { PIECES_SETUP } from 'shared/constants';
import { GameStages } from 'shared/enums';
import { HandlePieceMovingType } from 'shared/types';

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

    const handlePieceMoving = useCallback<HandlePieceMovingType>((pieceQuery, newPosition) => {
        const { board } = gameCoreRef.current;
        const draggedPiece = typeof pieceQuery === 'string' ? 
            board.getPieceById(pieceQuery) :
            board.getPieceByCoordinates(pieceQuery.x, pieceQuery.y);

        if (draggedPiece) {
            board.movePiece(draggedPiece, newPosition.x, newPosition.y);
            setSelection(null);
        }
    }, []);

    return (
        <RootContext.Provider value={{
            ...rootState,
            bank,
            selection,
            setSelection,
            setBank,
            gameCoreRef,
            handlePieceMoving,
        }}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => {
    return useContext(RootContext);
};