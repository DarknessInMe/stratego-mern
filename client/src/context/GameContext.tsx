import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { ContextProvider, Figure } from 'shared/interfaces';
import { board as defaultBoard, gameRules, FIGURE_MAP } from 'shared/constants';
import { BoardEntity, SetState } from 'shared/types';
// import { SCOUT, GENERAL } from 'shared/constants';
import { SpecialFigures, Teams } from 'shared/enums';

interface GameContext {
    board: BoardEntity[][],
    setBoard: SetState<BoardEntity[][]>,
    picker: Figure[],
    setPicker: SetState<Figure[]>,
    utils: GameContextUtils,
}

interface GameContextUtils {
    shouldGenerateRankWeight: (figure: Figure) => boolean,
}

const GameContext = createContext({} as GameContext);

const GameProvider: FC<ContextProvider> = ({ children }) => {
    const [board, setBoard] = useState<BoardEntity[][]>(defaultBoard);
    const [picker, setPicker] = useState<Figure[]>([]);

    const _init = () => {
        const initPicker: Figure[] = []

        for (const weight in gameRules.figures) {
            const quantity = gameRules.figures[weight];

            for (let i = 0; i < quantity; i++) {
                const figure = FIGURE_MAP[weight];

                initPicker.push(figure);
            }
        }

        setPicker(initPicker);
    }

    useEffect(() => {
        _init();
    }, [])

    const shouldGenerateRankWeight = (figure: Figure) => {
        return !([SpecialFigures.BOMB, SpecialFigures.FLAG].includes(figure.rankWeight as SpecialFigures))
    };


    const utils: GameContextUtils = {
        shouldGenerateRankWeight,
    }

    return (
        <GameContext.Provider value={{
            board,
            setBoard,
            picker,
            setPicker,
            utils,
        }}>
            { children }
        </GameContext.Provider>
    )
}

const useGameContext = () => useContext(GameContext);

export { GameContext, useGameContext, GameProvider }