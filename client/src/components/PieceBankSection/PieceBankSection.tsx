import React, { useMemo } from 'react';
import { Piece } from 'components/Piece';
import { useRootContext } from 'context/RootContext';
import { generateInitSetup } from 'shared/utils';
import { useDrop } from 'react-dnd';
import { DragTypesEnum } from 'shared/enums';

//! TODO: make different wrappers for Piece.tsx, which are responsive for DnD from bank and from board

export const PieceBankSection: React.FC = () => {
    const { bank, setBank, gameCoreRef } = useRootContext();
    const [_, dropRef] = useDrop(() => ({
        accept: DragTypesEnum.BOARD_TO_BANK,
        drop: ({ rankName, coordinates }) => {
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
                        <Piece 
                            key={`${item}-${index}`}
                            rankName={item}
                        />
                    );
                })}
            </div>
        </div>
    );
};
