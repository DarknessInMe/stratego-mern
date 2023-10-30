import React, { memo, useMemo } from 'react';
import clsx from 'clsx';
import { useSessionContext } from 'context/SessionContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'router';
import { useControllers } from 'hooks/useControllers';

export const Room = memo(() => {
    const { session, currentUser } = useSessionContext();
    const { onToggleStatus, onLeaveRoom, onKickUser, onStartGame } = useControllers();

    const link = `${window.origin}/join/${session?.id}`;
    const isOwner = currentUser?.id === session?.ownerId;

    const isReadyToStart = useMemo(() => {
        if (!session || session?.users?.length !== 2) {
            return false;
        }

        return session.users.every(({ isReady }) => isReady);
    }, [session]);

    const copyLink = () => {
        navigator.clipboard.writeText(link);
    };

    const copySessionId = () => {
        navigator.clipboard.writeText(session?.id);
    };

    if (!session) {
        return <Navigate to={ROUTES.HOME} replace/>;
    }

    return (
        <div className='page'>
            <div className='room-page'>
                <section className='room-page__link-section'>
                    <div>
                        <p>Invite link</p>
                        <input 
                            disabled
                            value={link}
                            className='room-page__link-input'
                        />
                        <button
                            onClick={copyLink}
                        >
                            Copy
                        </button>
                    </div>
                    <div>
                        <p>Session id</p>
                        <input 
                            disabled
                            value={session?.id}
                            className='room-page__link-input'
                        />
                        <button
                            onClick={copySessionId}
                        >
                            Copy
                        </button>
                    </div>
                </section>
                <section>
                    <button onClick={onLeaveRoom}>Leave room</button>
                    {isOwner && (
                        <button 
                            disabled={!isReadyToStart}
                            onClick={onStartGame}
                        >
                            Start game
                        </button>
                    )}
                </section>
                <section className='room-page__users-section'>
                    {session.users.map((user, index) => {
                        const isCurrentUser = currentUser?.id === user.id;
                        const showKick = isOwner && user.id !== currentUser?.id;

                        return (
                            <div
                                key={user.id}
                                className='user-item'
                            >
                                <span>
                                    <strong>User {index} </strong>
                                    {isCurrentUser ? <i>You</i> : null}
                                </span>
                                <span>{user.id === session.ownerId ? 'Owner' : ''}</span>
                                <span
                                    className={clsx('user-item__status', user.isReady && 'user-item_ready')}
                                >
                                    {user.isReady ? 'Ready' : 'Not ready'} 
                                </span>
                                {isCurrentUser && (
                                    <button
                                        onClick={onToggleStatus}
                                    >
                                        {user.isReady ? 'Cancel' : 'Get ready'}
                                    </button>
                                )}
                                {showKick && (
                                    <button onClick={() => onKickUser(user.id)}>x</button>
                                )}
                            </div>
                        );
                    })}
                </section>
            </div>
        </div>
    );
});
