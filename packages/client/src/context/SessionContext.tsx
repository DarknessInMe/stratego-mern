import React, { 
    createContext, 
    useState,
    useContext,
    useEffect,
} from 'react';
import { ISession, IUserEntity } from '@stratego/common';
import { IContextProps, ISessionContextValue } from 'shared/interfaces';
import { SESSION_STORAGE_KEYS } from 'shared/constants';
import { v4 as uuidv4 } from 'uuid';
import { socket } from 'socket';
import { FRONTEND_SOCKET_EVENTS } from '@stratego/common';

const SessionContext = createContext<ISessionContextValue>(null);

export const SessionProvider: React.FC<IContextProps> = ({ children }) => {
    const [session, setSession] = useState<ISession | null>(null);

    const initUser = () => {
        sessionStorage.setItem(SESSION_STORAGE_KEYS.USER_ID, uuidv4());
    };

    const initSockets = () => {
        socket.on(FRONTEND_SOCKET_EVENTS.ON_USER_JOIN, (user: IUserEntity) => {
            setSession((prevSession) => ({
                ...prevSession,
                users: [...prevSession.users, user]
            }));
        });
        socket.on(FRONTEND_SOCKET_EVENTS.ON_USER_UPDATE, () => {
            console.log('Updated!');
        });
    };

    useEffect(() => {
        initUser();
        initSockets();

        return () => {};
    }, []);

    return (
        <SessionContext.Provider value={{
            session,
            setSession
        }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    return useContext(SessionContext);
};