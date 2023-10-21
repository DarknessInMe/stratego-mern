import React, { 
    createContext, 
    useState,
    useContext,
    useEffect,
} from 'react';
import { ISession } from '@stratego/common';
import { IContextProps, ISessionContextValue } from 'shared/interfaces';
import { SESSION_STORAGE_KEYS } from 'shared/constants';
import { v4 as uuidv4 } from 'uuid';

const SessionContext = createContext<ISessionContextValue>(null);

export const SessionProvider: React.FC<IContextProps> = ({ children }) => {
    const [session, setSession] = useState<ISession | null>(null);

    useEffect(() => {
        sessionStorage.setItem(SESSION_STORAGE_KEYS.USER_ID, uuidv4());
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