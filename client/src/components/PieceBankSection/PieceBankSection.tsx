import React, { useState } from 'react';
import { generateInitSetup } from './utils';
import { Piece } from 'components/Piece';

export const PieceBankSection: React.FC = () => {
    const [bank] = useState(generateInitSetup());

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
