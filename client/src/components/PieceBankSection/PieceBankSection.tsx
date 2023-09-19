import React, { useMemo } from 'react';
import { BankPiece } from 'components/Piece';
import { useRootContext } from 'context/RootContext';
import { generateInitSetup } from 'shared/utils';
import { useDrop } from 'react-dnd';
import { DragTypesEnum, PieceNameEnum } from 'shared/enums';
import { CoordinatesType } from 'shared/types';

//! TODO: make different wrappers for Piece.tsx, which are responsive for DnD from bank and from board

interface IDrop {
    rankName: PieceNameEnum,
    coordinates: CoordinatesType | null,
}

export const PieceBankSection: React.FC = () => {
    const { bank, setBank, gameCoreRef } = useRootContext();
    const [_, dropRef] = useDrop(() => ({
        accept: DragTypesEnum.PIECE_FROM_BOARD,
        drop: ({ rankName, coordinates }: IDrop) => {
            setBank((prevBank) => ({
                ...prevBank,
                [rankName]: prevBank[rankName] + 1,
            }));

            if (coordinates) {
                const { board } = gameCoreRef.current;
                board.removePieceFrom(coordinates.x, coordinates.y);
            }
        },
      }), []);

    const bankArray = useMemo(() => {
        return generateInitSetup(bank);
    }, [bank]);

    return (
        <div 
            className='screen__section screen__section_secondary'
            ref={dropRef}
        >
            <div className='bank'>
                {bankArray.map((item, index) => {
                    return (
                        <BankPiece 
                            key={`${item}-${index}`}
                            rankName={item}
                        />
                    );
                })}
            </div>
        </div>
    );
};
