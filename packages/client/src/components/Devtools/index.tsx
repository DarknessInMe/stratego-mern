import React, { useEffect } from 'react';
import { IDispositionItem } from '@stratego/common';
import { useGameContext } from 'context/GameContext';
import { useSessionContext } from 'context/SessionContext';
import { ALLOWED_SETUP_RANGES } from 'shared/constants';
import { PieceNameEnum } from 'shared/enums';
import { useBankControllers } from 'store';
import { v4 as uuidv4 } from 'uuid';

export const Devtools = () => {
    const { boardRef, gameDispatch } = useGameContext();
    const { currentUser } = useSessionContext();
    const { clearBank } = useBankControllers(gameDispatch);
    
    const generateStaticDisposition = () => {
        const [start, end] = ALLOWED_SETUP_RANGES[currentUser.team];
        const disposition: IDispositionItem[] = [];

        for (let y = start; y <= end; y++) {
            for (let x = 0; x < 10; x++) {
                disposition.push({
                    x, y, rankName: PieceNameEnum.MAJOR, id: uuidv4(),
                });
            }
        }

        boardRef.current.registerDisposition(disposition, currentUser.team);
        clearBank();
    };
    
    useEffect(() => {
        window._devTools = {
            setup: generateStaticDisposition
        };

        return () => {
            delete window._devTools;
        };
    }, []);

    return <></>;
};
