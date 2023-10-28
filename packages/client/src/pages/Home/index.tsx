import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Api } from 'api';
import { SESSION_STORAGE_KEYS } from 'shared/constants';
import { useSessionContext } from 'context/SessionContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { socket } from 'socket';
import { BACKEND_SOCKET_EVENTS } from '@stratego/common';

export const Home = () => {
    const api = Api.getInstance();
    const history = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const { session, setSession } = useSessionContext();
    const userId = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_ID);

    const onCreate = async () => {
        try {
            socket.connect();
            const { data } = await api.room.create({
                creatorId: userId,
            });
            
            setSession(data);
            socket.emit(BACKEND_SOCKET_EVENTS.CREATE_ROOM, data.id);
        } catch {
            socket.disconnect();
        }
    };

    const onJoin = async () => {
        try {
            socket.connect();
            const { value: roomId } = inputRef.current;
            const { data } = await api.room.join({
                roomId, userId
            });
            
            setSession(data.session);
            socket.emit(BACKEND_SOCKET_EVENTS.JOIN_USER, data.session.id, data.user);
        } catch {
            socket.disconnect();
        }
    };

    useEffect(() => {
        if (!session) {
            return;
        }

        history(generatePath(ROUTES.ROOM, { id: session.id }));
    }, [session]);

    return (
        <div className={clsx('home', 'page')}>
            <div className='home__content'>
                <h1>Stratego</h1>
                <section>
                    <h2>Create an own game room</h2>
                    <button onClick={onCreate}>Create</button>
                </section>
                <hr />
                <section>
                    <h2>Join to existing game room</h2>
                    <div>
                        <input ref={inputRef}/>
                        <button onClick={onJoin}>Join</button>
                    </div>
                </section>
            </div>
        </div>
    );
};
