import React, { useRef } from 'react';
import clsx from 'clsx';
import { useSessionControllers } from 'hooks/useSessionControllers';

export const Home = () => {
    const { onCreate, onJoin } = useSessionControllers();
    const inputRef = useRef<HTMLInputElement>(null);

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
                        <button onClick={() => onJoin(inputRef.current.value)}>Join</button>
                    </div>
                </section>
            </div>
        </div>
    );
};
