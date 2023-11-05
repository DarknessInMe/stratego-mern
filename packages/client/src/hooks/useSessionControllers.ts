import { useCallback } from 'react';
import { IUpdateUser, IUserStatus } from '@stratego/common';
import { useSessionContext } from 'context/SessionContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { socket } from 'socket';
import { v4 as uuidv4 } from 'uuid';

export const useSessionControllers = () => {
    const history = useNavigate();
    const { 
        setSession,
        currentUser,
        userStatuses,
        setUserStatuses,
    } = useSessionContext();

    const onCreate = useCallback(async () => {
        try {
            const sessionId = uuidv4();

            socket.connect(sessionId);
            const createdSession = await socket.createRoom();

            if (createdSession === null) {
                return;
            }

            setSession(createdSession);
            history(generatePath(ROUTES.ROOM, { id: createdSession.id }));
            
        } catch {
            socket.disconnect();
        }
    }, []);

    const onJoin = useCallback(async (roomId) => {
        try {
            socket.connect(roomId);
            const session = await socket.joinRoom();

            if (session === null) {
                return;
            }

            setSession(session);
            history(generatePath(ROUTES.ROOM, { id: session.id }));
        } catch {
            socket.disconnect();
            history(ROUTES.HOME);
        }
    }, []);

    const onChangeStatus = useCallback(async (status: Partial<IUserStatus>) => {
        try {
            const updatedStatus = await socket.updateUser(status);

            if (updatedStatus === null) {
                return;
            }

            handleStatusUpdating(updatedStatus);
        } catch {
            //
        }
    }, []);

    const onToggleLobby = useCallback(async () => {
        await onChangeStatus({
            isLobbyReady: !userStatuses[currentUser.id].isLobbyReady,
        });
    }, [userStatuses, currentUser?.id]);

    const onToggleGame = useCallback(async () => {
        await onChangeStatus({
            isGameReady: !userStatuses[currentUser.id].isGameReady,
        });
    }, [userStatuses, currentUser?.id]);

    const onLeaveRoom = useCallback(() => {
        socket.disconnect();
        setSession(null);
    }, []);

    const handleStatusUpdating = useCallback(({ userId, status }: IUpdateUser) => {
        setUserStatuses((prevStatuses) => ({
            ...prevStatuses,
            [userId]: {
                ...prevStatuses[userId],
                ...status,
            }
        }));
    }, []);

    const onKickUser = useCallback(async (userId: string) => {
        try {
            const canBeKicked = await socket.kickUser();

            if (!canBeKicked) {
                return;
            }

            setSession((prevSession) => {
                if (!prevSession) {
                    return prevSession;
                }
    
                return {
                    ...prevSession,
                    users: prevSession.users.filter(({ id }) => id !== userId)
                };
            });
        } catch {
            //
        }
    }, []);

    const onStartGame = useCallback(async () => {
        const canBeStarted = await socket.startGame();

        if (canBeStarted) {
            history(ROUTES.GAME);
        }
    }, []);

    return {
        onCreate,
        onJoin,
        onToggleLobby,
        onLeaveRoom,
        onKickUser,
        onStartGame,
        onToggleGame,
        handleStatusUpdating,
    };
};