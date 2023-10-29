import { Api } from 'api';
import { useSessionContext } from 'context/SessionContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { socket } from 'socket';
import { BACKEND_SOCKET_EVENTS } from '@stratego/common';
import { getUserId } from 'shared/utils';

export const useControllers = () => {
    const api = Api.getInstance();
    const history = useNavigate();
    const { 
        session, 
        setSession,
        currentUser,
        updateUserInSession 
    } = useSessionContext();

    const onCreate = async () => {
        try {
            socket.connect();

            const { data } = await api.room.create({
                creatorId: getUserId(),
            });

            setSession(data);
            socket.emit(BACKEND_SOCKET_EVENTS.CREATE_ROOM, data.id);
            history(generatePath(ROUTES.ROOM, { id: data.id }));
        } catch {
            socket.disconnect();
        }
    };

    const onJoin = async (roomId) => {
        try {
            socket.connect();

            const { data } = await api.room.join({
                roomId, userId: getUserId(),
            });

            setSession(data.session);
            socket.emit(BACKEND_SOCKET_EVENTS.JOIN_USER, data.session.id, data.user);
            history(generatePath(ROUTES.ROOM, { id: data.session.id }));
        } catch {
            socket.disconnect();
            history(ROUTES.HOME);
        }
    };

    const onToggleStatus = async () => {
        try {
            const { data } = await api.room.updatePlayer({
                roomId: session.id,
                userId: currentUser.id,
                payload: {
                    isReady: !currentUser.isReady,
                }
            });

            updateUserInSession(data);
            socket.emit(BACKEND_SOCKET_EVENTS.UPDATE_USER, session.id, data);
        } catch {
            //
        }
    };

    return {
        onCreate,
        onJoin,
        onToggleStatus,
    };
};