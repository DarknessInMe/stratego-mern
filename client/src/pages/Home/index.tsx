import React from 'react';
import clsx from 'clsx';

export const Home = () => {
    return (
        <div className={clsx('home', 'page')}>
            <div className='home__content'>
                <h1>Stratego</h1>
                <section>
                    <h2>Create an own game room</h2>
                    <button>Create</button>
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
