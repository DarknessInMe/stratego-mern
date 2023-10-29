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

const SessionContext = createContext<ISessionContextValue>(null);

export const SessionProvider: React.FC<IContextProps> = ({ children }) => {
    const [session, setSession] = useState<ISession | null>(null);

    const currentUser = useMemo(() => {
        if (!session) {
            return null;
        }

        return session.users.find(({ id }) => id === getUserId());
    }, [session?.users]);

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
    const initSockets = () => {
        socket.on(FRONTEND_SOCKET_EVENTS.ON_USER_JOIN, (user: IUser) => {
            setSession((prevSession) => ({
                ...prevSession,
                users: [...prevSession.users, user]
            }));
        });
        socket.on(FRONTEND_SOCKET_EVENTS.ON_USER_UPDATE, (user: IUser) => {
            updateUserInSession(user);
        });
    };

    useEffect(() => {
        initSockets();
    }, []);

    return (
        <SessionContext.Provider value={{
            session,
            setSession,
            currentUser,
            updateUserInSession,
        }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    return useContext(SessionContext);
};