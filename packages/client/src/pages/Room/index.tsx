import clsx from 'clsx';
import { useSessionContext } from 'context/SessionContext';
import React, { memo } from 'react';

export const Room = memo(() => {
    const { session } = useSessionContext();
    const link = `${window.origin}/join/${session.id}`;

    const onCopy = () => {
        navigator.clipboard.writeText(link);
    };

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
