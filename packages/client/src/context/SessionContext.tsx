import React, { 
    createContext, 
    useState,
    useContext,
    useEffect,
    useMemo,
} from 'react';
import { ISession, IUpdateUser, IUser } from '@stratego/common';
import { IContextProps, ISessionContextValue } from 'shared/interfaces';
import { socket } from 'socket';
import { RESPONSE_EVENTS } from '@stratego/common';
import { getUserId } from 'shared/utils';
import { ROUTES } from 'router';
import { useNavigate } from 'react-router-dom';
import { UsersStatusStoreType } from 'shared/types';

const SessionContext = createContext<ISessionContextValue>(null);

export const SessionProvider: React.FC<IContextProps> = ({ children }) => {
    const [session, setSession] = useState<ISession | null>(null);
    const [userStatuses, setUserStatuses] = useState<UsersStatusStoreType>({});

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

    const handleStatusUpdating = ({ userId, status }: IUpdateUser) => {
        setUserStatuses((prevStatuses) => ({
            ...prevStatuses,
            [userId]: {
                ...prevStatuses[userId],
                ...status,
            }
        }));
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

    useEffect(() => {
        socket.root.on(RESPONSE_EVENTS.ON_USER_JOIN, handleUserJoining);
        socket.root.on(RESPONSE_EVENTS.ON_USER_UPDATE, handleStatusUpdating);
        socket.root.on(RESPONSE_EVENTS.ON_USER_LEAVE, handleUserLeaving);
        socket.root.on(RESPONSE_EVENTS.ON_USER_KICK, handleUserKicking);
        socket.root.on(RESPONSE_EVENTS.ON_GAME_STARTED, handleGameStarting);

        return () => {
            socket.root.off(RESPONSE_EVENTS.ON_USER_JOIN, handleUserJoining);
            socket.root.off(RESPONSE_EVENTS.ON_USER_UPDATE, handleStatusUpdating);
            socket.root.off(RESPONSE_EVENTS.ON_USER_LEAVE, handleUserLeaving);
            socket.root.off(RESPONSE_EVENTS.ON_USER_KICK, handleUserKicking);
            socket.root.off(RESPONSE_EVENTS.ON_GAME_STARTED, handleGameStarting);
        };
    }, []);

    return (
        <SessionContext.Provider value={{
            session,
            setSession,
            userStatuses,
            setUserStatuses,
            currentUser,
            handleStatusUpdating,
        }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    return useContext(SessionContext);
};