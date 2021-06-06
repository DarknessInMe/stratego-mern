import React from "react";
import { field } from "./common/constants/field";
import { Entities } from "./common/enums/entities";
import { Ceil } from "./modules/Ceil/Ceil";
import { Water } from "./modules/Water/Water";

const App: React.FC = () => {
	return (
		<div className="game">
			{field.map((row, rowIndex) => (
				<div className="game__row" key={`row-${rowIndex}`}>
					{row.map((ceil, ceilIndex) => {
						if (ceil?.type === Entities.WATER) {
							return (
								<Water
									borderDirection={ceil.borderDirection}
									key={`ceil-${ceilIndex}`}
								/>
							);
						}
						return <Ceil data={ceil} key={`ceil-${ceilIndex}`} />;
					})}
				</div>
			))}
		</div>
	);
};

export default App;
