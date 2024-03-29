import React from 'react';
import 'index.scss';
import { render } from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import { Game } from 'pages/Game';
import { Room } from 'pages/Room';
import { Join } from 'pages/Join';
import { NotFound } from 'pages/NotFound';
import { SessionProvider } from 'context/SessionContext';
import { ROUTES } from 'router';
import { ProtectedScreen } from 'components/ProtectedScreen';

const Root: React.FC = () => (
    <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
            <SessionProvider>
                <Routes>
                    <Route path={ROUTES.HOME} index element={<Home />} />
                    <Route path={ROUTES.JOIN} element={<Join />}/>
                    <Route element={<ProtectedScreen />}>
                        <Route path={ROUTES.ROOM} element={<Room />}/>
                        <Route path={ROUTES.GAME} element={<Game />}/>
                    </Route>
                    <Route path={ROUTES.NOT_FOUND} element={<NotFound />}/>
                </Routes>
            </SessionProvider>
        </BrowserRouter>
    </DndProvider>
);

render(<Root />, document.getElementById('root'));
