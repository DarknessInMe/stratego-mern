import React, { createContext, FC, useContext } from 'react';
import { ContextProvider } from '../shared/interfaces';

const GameContext = createContext({});

const GameProvider: FC<ContextProvider> = ({ children }) => {

    return (
        <GameContext.Provider value={{}}>
            { children }
        </GameContext.Provider>
    )
}

const useGameContext = () => useContext(GameContext);

export { GameContext, useGameContext, GameProvider }