import { IUserStatus } from '@stratego/common';
import { useSessionContext } from 'context/SessionContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { socket } from 'socket';
import { v4 as uuidv4 } from 'uuid';

export const useControllers = () => {
    const history = useNavigate();
    const { 
        setSession,
        currentUser,
        userStatuses,
        handleStatusUpdating,
    } = useSessionContext();

    const onCreate = async () => {
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
    };

    const onJoin = async (roomId) => {
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
    };

    const onChangeStatus = async (status: Partial<IUserStatus>) => {
        try {
            const updatedStatus = await socket.updateUser(status);

            if (updatedStatus === null) {
                return;
            }

            handleStatusUpdating(updatedStatus);
        } catch {
            //
        }
    };

    const onToggleLobby = async () => {
        await onChangeStatus({
            isLobbyReady: !userStatuses[currentUser.id].isLobbyReady,
        });
    };

    const onToggleGame = async () => {
        await onChangeStatus({
            isGameReady: !userStatuses[currentUser.id].isGameReady,
        });
    };

    const onLeaveRoom = () => {
        socket.disconnect();
        setSession(null);
    };

    const onKickUser = async (userId: string) => {
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
    };

    const onStartGame = async () => {
        const canBeStarted = await socket.startGame();

        if (canBeStarted) {
            history(ROUTES.GAME);
        }
    };

    return {
        onCreate,
        onJoin,
        onToggleLobby,
        onLeaveRoom,
        onKickUser,
        onStartGame,
        onToggleGame,
    };
};