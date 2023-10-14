import React from 'react';
import 'index.scss';
import { render } from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import { Game } from 'pages/Game';
import { NotFound } from 'pages/NotFound';

const Root: React.FC = () => {
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
