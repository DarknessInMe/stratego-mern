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
import { HandlePieceMovingType, CanMoveBoardPieceTo, OnMoveByClick } from 'shared/types';

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

    // TODO: move into hooks
    const handlePieceMoving = useCallback<HandlePieceMovingType>((pieceQuery, newPosition) => {
        const { board } = gameCoreRef.current;
        const targetCell = board.getCell(newPosition.x, newPosition.y);
        const draggedPiece = typeof pieceQuery === 'string' ? 
            board.getPieceById(pieceQuery) :
            board.getPieceByCoordinates(pieceQuery.x, pieceQuery.y);

        if (!draggedPiece) {
            return;
        }

        if (targetCell.pieceId) {
            const targetPiece = board.getPieceById(targetCell.pieceId);
            const fightResult = draggedPiece.canBeat(targetPiece.rankName);

            console.log(fightResult);
        } else {
            board.movePiece(draggedPiece, newPosition.x, newPosition.y);
        }

        setSelection(null);
    }, []);

    const canMoveBoardPieceTo = useCallback<CanMoveBoardPieceTo>((movedFrom, moveTo) => {
        const { board } = gameCoreRef.current;
        const draggedPiece = board.getPieceByCoordinates(movedFrom.x, movedFrom.y);

        if (draggedPiece) {
            return draggedPiece.isCorrectPath(moveTo.x, moveTo.y);
        }

        return false;
    }, []);

    const onMoveByClick = useCallback<OnMoveByClick>((isSelectedCell, cellPosition) => {
        if (!isSelectedCell || !selection) {
            return;
        }

        handlePieceMoving(selection.pieceAt, cellPosition);
    }, [selection, handlePieceMoving]);

    return (
        <RootContext.Provider value={{
            ...rootState,
            bank,
            selection,
            setSelection,
            setBank,
            gameCoreRef,
            handlePieceMoving,
            canMoveBoardPieceTo,
            onMoveByClick,
        }}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => {
    return useContext(RootContext);
};