import React, { memo, useEffect } from 'react';
import clsx from 'clsx';
import { useSessionContext } from 'context/SessionContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { socket } from 'socket';

export const Room = memo(() => {
    const { session } = useSessionContext();
    const link = `${window.origin}/join/${session?.id}`;

    const onCopy = () => {
        navigator.clipboard.writeText(link);
    };

    useEffect(() => {
        function onConnect() {
            console.log('connected');
        }

        function onDisconnect() {
            console.log('disconnected');
        }

        socket.connect();
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.disconnect();
        };
    }, []);

    if (!session) {
        return <Navigate to={ROUTES.HOME} replace/>;
    }

    return (
        <div className='page'>
            <div className='room-page'>
                <section className='room-page__link-section'>
                    <p>Invite link</p>
                    <input 
                        disabled
                        value={link}
                        className='room-page__link-input'
                    />
                    <button
                        onClick={onCopy}
                    >
                        Copy
                    </button>
                </section>
                <section className='room-page__users-section'>
                    {session.users.map((user, index) => (
                        <div
                            key={user.id}
                            className='user-item'
                        >
                            <span>
                                <strong>User {index}</strong>
                            </span>
                            <span>{user.id === session.ownerId ? 'Owner' : ''}</span>
                            <span
                                className={clsx('user-item__status', user.isReady && 'user-item_ready')}
                            >
                                {user.isReady ? 'Ready' : 'Not ready'} 
                            </span>
                            <button>{user.isReady ? 'Cancel' : 'Get ready'}</button>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
});
