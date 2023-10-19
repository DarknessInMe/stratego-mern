import React from 'react';
import clsx from 'clsx';
import { Api } from 'api';
import { SESSION_STORAGE_KEYS } from 'shared/constants';

export const Home = () => {
    const api = Api.getInstance();

    const onCreate = async () => {
        try {
            await api.room.create({
                creatorId: sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_ID),
            });
        } catch {
            //
        }
    };

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
