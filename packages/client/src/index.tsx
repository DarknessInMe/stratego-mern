import React, { useEffect } from 'react';
import 'index.scss';
import { render } from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import { Game } from 'pages/Game';
import { NotFound } from 'pages/NotFound';
import { SESSION_STORAGE_KEYS } from 'shared/constants';
import { v4 as uuidv4 } from 'uuid';

const Root: React.FC = () => {
    useEffect(() => {
        sessionStorage.setItem(SESSION_STORAGE_KEYS.USER_ID, uuidv4());
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/game' element={<Game />}/>
                    <Route path='*' element={<NotFound />}/>
                </Routes>
            </BrowserRouter>
        </DndProvider>
    );
};

render(<Root />, document.getElementById('root'));
