import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Api } from 'api';
import { SESSION_STORAGE_KEYS } from 'shared/constants';
import { useSessionContext } from 'context/SessionContext';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { socket } from 'socket';

export const Home = () => {
    const api = Api.getInstance();
    const history = useNavigate();
    const { session, setSession } = useSessionContext();

    const onCreate = async () => {
        try {
            socket.connect();
            const { data } = await api.room.create({
                creatorId: sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_ID),
            });
            
            setSession(data);
        } catch {
            //
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
                        <input />
                        <button>Join</button>
                    </div>
                </section>
            </div>
        </div>
    );
};
