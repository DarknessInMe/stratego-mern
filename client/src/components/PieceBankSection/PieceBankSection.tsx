import React from 'react';
import { Piece } from 'components/Piece';
import { useRootContext } from 'context/RootContext';

export const PieceBankSection: React.FC = () => {
    const { bank } = useRootContext();

    return (
        <div className='screen__section screen__section_secondary'>
            <div className='bank'>
                {bank.map((item, index) => {
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
