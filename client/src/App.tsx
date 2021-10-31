import React from "react";
import { Board } from "modules/Board";
import { FigurePicker } from "modules/FigurePicker";

const App: React.FC = () => {
	return (
		<>
			<div className="board">
				<Board />
			</div>
			<FigurePicker />
		</>
	);
};

export default App;
