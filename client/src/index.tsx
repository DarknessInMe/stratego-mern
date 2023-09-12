import React from 'react';
import { render } from 'react-dom';
import App from 'App';
import 'index.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Root: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
    );
};

render(<Root />, document.getElementById('root'));
