import React, { useRef, useState, useEffect } from 'react';
import { GameCore } from 'core/GameCore';
import { BoardFieldType } from 'shared/types';
import { BoardSection } from 'components/BoardSection';
import { PieceBankSection } from 'components/PieceBankSection';

const App: React.FC = () => {
	const [board, setBoard] = useState<BoardFieldType>([]);
	const gameCoreRef = useRef(new GameCore(setBoard));

	useEffect(() => {
		gameCoreRef.current.init();
	}, []);

	return (	
		<div className='screen'>
			<BoardSection board={board}/>
			<PieceBankSection />
		</div>
	);
};

export default App;
