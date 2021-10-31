import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { ContextProvider } from 'shared/interfaces';
import { board as defaultBoard } from 'shared/constants';
import { BoardEntity, SetState } from 'shared/types';
import { SCOUT, GENERAL } from 'shared/constants';
import { Teams } from 'shared/enums';

interface GameContext {
    board: BoardEntity[][],
    setBoard: SetState<BoardEntity[][]>
}

const GameContext = createContext({} as GameContext);

const GameProvider: FC<ContextProvider> = ({ children }) => {
    const [board, setBoard] = useState<BoardEntity[][]>([]);

    const _init = () => {
        const generalEntity = {
            figure: GENERAL,
            selected: false,
            position: {
                x: 9,
                y: 9
            },
            team: Teams.BLUE_TEAM,
        };

        const scoutEntity = {
            figure: SCOUT,
            selected: false,
            position: {
                x: 0,
                y: 9
            },
            team: Teams.BLUE_TEAM,
        };

        setBoard(() => {
            defaultBoard[9][0] = scoutEntity;
            defaultBoard[9][9] = generalEntity;

            return defaultBoard;
        })
    }

    useEffect(() => {
        _init();
    }, [])

    return (
        <GameContext.Provider value={{
            board,
            setBoard,
        }}>
            { children }
        </GameContext.Provider>
    )
}

const useGameContext = () => useContext(GameContext);

export { GameContext, useGameContext, GameProvider }