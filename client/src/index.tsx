import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./index.scss";
import { GameProvider } from './context';

const Root: React.FC = () => {

    return (
        <GameProvider>
            <App />
        </GameProvider>
    )
}
render(<Root />, document.getElementById("root"));
