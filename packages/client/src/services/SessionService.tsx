import React, { memo, useEffect } from 'react';
import { IUser, RESPONSE_EVENTS } from '@stratego/common';
import { socket } from 'socket';
import { useSessionContext } from 'context/SessionContext';
import { ROUTES } from 'router';
import { useNavigate } from 'react-router-dom';
import { useSessionControllers } from 'hooks/useSessionControllers';

export const SessionService = memo(() => {
    const { setSession } = useSessionContext();
    const { handleStatusUpdating } = useSessionControllers();
    const history = useNavigate();
    
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
        <></>
    );
});
