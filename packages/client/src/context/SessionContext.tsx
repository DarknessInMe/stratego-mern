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
import { RESPONSE_EVENTS } from '@stratego/common';
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

    const handleUserKicking = () => {
        setSession(null);
    };

    const handleUserUpdating = (updatedUser: IUser) => {
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
        socket.root.on(RESPONSE_EVENTS.ON_USER_JOIN, handleUserJoining);
        socket.root.on(RESPONSE_EVENTS.ON_USER_UPDATE, handleUserUpdating);
        socket.root.on(RESPONSE_EVENTS.ON_USER_LEAVE, handleUserLeaving);
        socket.root.on(RESPONSE_EVENTS.ON_USER_KICK, handleUserKicking);
        socket.root.on(RESPONSE_EVENTS.ON_GAME_STARTED, handleGameStarting);

        return () => {
            socket.root.off(RESPONSE_EVENTS.ON_USER_JOIN, handleUserJoining);
            socket.root.off(RESPONSE_EVENTS.ON_USER_UPDATE, handleUserUpdating);
            socket.root.off(RESPONSE_EVENTS.ON_USER_LEAVE, handleUserLeaving);
            socket.root.off(RESPONSE_EVENTS.ON_USER_KICK, handleUserKicking);
            socket.root.off(RESPONSE_EVENTS.ON_GAME_STARTED, handleGameStarting);
        };
    }, []);

    return (
        <SessionContext.Provider value={{
            session,
            setSession,
            currentUser,
            handleUserUpdating,
        }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    return useContext(SessionContext);
};