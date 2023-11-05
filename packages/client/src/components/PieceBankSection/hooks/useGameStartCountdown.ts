import { useEffect, useState, useRef } from 'react';
import { useGameContext } from 'context/GameContext';
import { GameStages } from 'shared/enums';
import { socket } from 'socket';
import { useGameCoreControllers } from 'store';

export const useGameStartCountDown = (start: boolean) => {
    const { gameState, boardRef, gameDispatch } = useGameContext();
    const { setMode } = useGameCoreControllers(gameDispatch);

    const [countdown, setCountdown] = useState<number | null>(null);
    const intervalRef = useRef(null);
    const prevCountRef = useRef(null);

    useEffect(() => {
        if (!start) {
            return;
        }

        setCountdown(10);
        socket.sendDisposition(boardRef.current.extractDisposition(gameState.teams.currentPlayer));

        intervalRef.current = setInterval(() => {
            setCountdown(prevCount => prevCount === 0 ? null : prevCount - 1);
        }, 1000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [start]);

    useEffect(() => {
        if (countdown === null && prevCountRef.current === 0) {
            clearInterval(intervalRef.current);
            setMode(GameStages.GAME_IN_PROCESS);
        }

        prevCountRef.current = countdown;
    }, [countdown]);

    return { countdown };
};