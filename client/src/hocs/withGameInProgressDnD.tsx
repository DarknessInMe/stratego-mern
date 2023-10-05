import React, { memo, useCallback, useEffect } from 'react';
import { ICellComponentProps, IDraggableCellProps } from 'shared/interfaces';
import { ReactComponentWithRefType } from 'shared/types';
import { usePieceFromBoardDnD } from 'hooks/usePieceFromBoardDnD';
import { useMovePiece } from 'hooks/useMovePiece';
import { useSelection } from 'hooks/useSelection';
import { useCellCoordinates } from 'hooks/useCellCoordinates';

export const withGameInProgressDnD = (WrappedComponent: ReactComponentWithRefType<IDraggableCellProps>) => {
    const Component: React.FC<ICellComponentProps> = memo(({ cell }) => {
        const [{ isOver }, dropRef] = usePieceFromBoardDnD(cell);
        const { onMoveByClick } = useMovePiece();
        const { isCellHighlighted } = useSelection();
        const landRef = useCellCoordinates(cell);
        const isHighlighted = isCellHighlighted(cell);
    
        useEffect(() => {
            if (!landRef.current) {
                return;
            }
    
            dropRef(landRef.current);
        }, []);
    
        const onMouseDown = useCallback(() => {
            onMoveByClick(cell);
        }, [onMoveByClick, cell]);

        return (
            <WrappedComponent
                ref={landRef}
                isOver={isOver}
                isHighlighted={isHighlighted}
                onMouseDown={onMouseDown}
            />
        );
    });

    return Component;
};