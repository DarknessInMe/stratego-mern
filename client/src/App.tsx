import React, { useRef, useState, useEffect } from 'react';
import { GameCore } from 'core/GameCore';
import { BoardFieldType } from 'shared/types';
import { CellFactory } from 'components/CellFactory';

const App: React.FC = () => {
	const [board, setBoard] = useState<BoardFieldType>([]);
	const gameCoreRef = useRef(new GameCore(setBoard));

	useEffect(() => {
		gameCoreRef.current.init();
	}, []);

	return (
		<div className='screen'>
			<div className='board'>
				{board.map((row, lineIndex) => row.map((cell, cellIndex) => (
					<CellFactory
						key={`key-${lineIndex}-${cellIndex}`}
						cell={cell}
					/>
				)))}
			</div>
		</div>
	);
};

export default App;
