import React, { 
    createContext, 
    useState,
    useContext,
    useEffect,
    useMemo,
} from 'react';
import { ISession, IUser } from '@stratego/common';
import { IContextProps, ISessionContextValue } from 'shared/interfaces';
import { socket } from 'socket';
import { FRONTEND_SOCKET_EVENTS } from '@stratego/common';
import { getUserId } from 'shared/utils';
import { ROUTES } from 'router';
import { useNavigate } from 'react-router-dom';

const SessionContext = createContext<ISessionContextValue>(null);

export const SessionProvider: React.FC<IContextProps> = ({ children }) => {
    const [session, setSession] = useState<ISession | null>(null);
    const history = useNavigate();
    
    const currentUser = useMemo(() => {
        if (!session) {
            return null;
        }

        return session.users.find(({ id }) => id === getUserId());
    }, [session?.users]);

    const handleUserJoining = (user: IUser) => {
        setSession((prevSession) => ({
            ...prevSession,
            users: [...prevSession.users, user]
        }));
    };

    const handleGameStarting = () => {
        history(ROUTES.GAME);  
    };

    const removeUser = (userId: string) => {
        setSession((prevSession) => {
            if (!prevSession) {
                return prevSession;
            }

            return {
                ...prevSession,
                users: prevSession.users.filter(({ id }) => id !== userId)
            };
        });
    };

    const onUserKick = () => {
        setSession(null);
    };

    const updateUserInSession = (updatedUser: IUser) => {
        setSession((prevSession) => {
            if (!prevSession) {
                return prevSession;
            }

            return {
                ...prevSession,
                users: prevSession.users.map(user => user.id !== updatedUser.id ? user : updatedUser),
            };
        });
    };

    const handleUserLeaving = (userId: string) => {
        setSession((prevSession) => {
            if (!prevSession) {
                return prevSession;
            }

            const updatedList = prevSession.users.filter(({ id }) => id !== userId);
            const sessionOwner = prevSession.ownerId === userId ? updatedList[0].id : prevSession.ownerId;

            return {
                ...prevSession,
                ownerId: sessionOwner,
                users: updatedList,
            };
        });
    };

    useEffect(() => {
        socket.on(FRONTEND_SOCKET_EVENTS.ON_USER_JOIN, handleUserJoining);
        socket.on(FRONTEND_SOCKET_EVENTS.ON_USER_UPDATE, updateUserInSession);
        socket.on(FRONTEND_SOCKET_EVENTS.ON_USER_LEAVE, handleUserLeaving);
        socket.on(FRONTEND_SOCKET_EVENTS.ON_USER_KICK, onUserKick);
        socket.on(FRONTEND_SOCKET_EVENTS.ON_GAME_STARTED, handleGameStarting);

        return () => {
            socket.off(FRONTEND_SOCKET_EVENTS.ON_USER_JOIN, handleUserJoining);
            socket.off(FRONTEND_SOCKET_EVENTS.ON_USER_UPDATE, updateUserInSession);
            socket.off(FRONTEND_SOCKET_EVENTS.ON_USER_LEAVE, handleUserLeaving);
            socket.off(FRONTEND_SOCKET_EVENTS.ON_USER_KICK, onUserKick);
            socket.off(FRONTEND_SOCKET_EVENTS.ON_GAME_STARTED, handleGameStarting);
        };
    }, []);

    return (
        <SessionContext.Provider value={{
            session,
            setSession,
            currentUser,
            updateUserInSession,
            removeUser,
        }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    return useContext(SessionContext);
};