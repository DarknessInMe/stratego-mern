import React from 'react';
import { BoardSection } from 'components/BoardSection';
import { PieceBankSection } from 'components/PieceBankSection';
import { RootProvider } from 'context/RootContext';

const App: React.FC = () => {
	return (
		<RootProvider>	
			<div className='screen'>
				<BoardSection />
				<PieceBankSection />
			</div>
		</RootProvider>
	);
};

export default App;
