import React from "react";
import { Borders } from "../../common/types/borders";
import { borderGenerator } from "../../common/utils/border-generator";

interface IWater {
	borderDirection: Borders;
}

export const Water: React.FC<IWater> = ({ borderDirection }) => {
	return (
		<div
			className="game__ceil game__ceil_aqueous"
			style={borderGenerator(borderDirection)}
		/>
	);
};
