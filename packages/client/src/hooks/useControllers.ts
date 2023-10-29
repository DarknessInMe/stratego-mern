import { Api } from 'api';
import { SESSION_STORAGE_KEYS } from 'shared/constants';
import { useSessionContext } from 'context/SessionContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { socket } from 'socket';
import { BACKEND_SOCKET_EVENTS } from '@stratego/common';

export const useControllers = () => {
    const api = Api.getInstance();
    const history = useNavigate();
    const { setSession } = useSessionContext();
    const userId = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_ID);

    const onCreate = async () => {
        try {
            socket.connect();
            const { data } = await api.room.create({
                creatorId: userId,
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
                roomId, userId
            });
            
            setSession(data.session);
            socket.emit(BACKEND_SOCKET_EVENTS.JOIN_USER, data.session.id, data.user);
            history(generatePath(ROUTES.ROOM, { id: data.session.id }));
        } catch {
            socket.disconnect();
            history(ROUTES.HOME);
        }
    };

    return {
        onCreate,
        onJoin,
    };
};