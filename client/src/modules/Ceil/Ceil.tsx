import React from "react";
import { ICard } from "../../common/interfaces/card";

interface ICeil {
	data: ICard | null;
}

export const Ceil: React.FC<ICeil> = () => {
	return <div className="game__ceil game__ceil_common"></div>;
};
