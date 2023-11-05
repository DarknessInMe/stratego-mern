import React, { 
    createContext, 
    useState,
    useContext,
    useEffect,
    useMemo,
} from 'react';
import { ISession } from '@stratego/common';
import { IContextProps, ISessionContextValue } from 'shared/interfaces';
import { getUserId } from 'shared/utils';
import { UsersStatusStoreType } from 'shared/types';
import { SessionService } from 'services/SessionService';

const SessionContext = createContext<ISessionContextValue>(null);

export const SessionProvider: React.FC<IContextProps> = ({ children }) => {
    const [session, setSession] = useState<ISession | null>(null);
    const [userStatuses, setUserStatuses] = useState<UsersStatusStoreType>({});
    
    const currentUser = useMemo(() => {
        if (!session) {
            return null;
        }

        return session.users.find(({ id }) => id === getUserId());
    }, [session?.users]);

    useEffect(() => {
        setUserStatuses((prevStatuses) => {
            if (!session) {
                return {};
            }

            const statusesCopy: UsersStatusStoreType = {};

            session.users.forEach(({ id }) => {
                if (!prevStatuses[id]) {
                    statusesCopy[id] = { isGameReady: false, isLobbyReady: false };
                } else {
                    statusesCopy[id] = prevStatuses[id];
                }
            });

            return statusesCopy;
        });
    }, [session?.users]);

    return (
        <SessionContext.Provider value={{
            session,
            setSession,
            userStatuses,
            setUserStatuses,
            currentUser,
        }}>
            <SessionService />
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    return useContext(SessionContext);
};