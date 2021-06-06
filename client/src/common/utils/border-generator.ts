import { Borders } from "../types/borders";

export const borderGenerator = (direction: Borders) => {
	switch (direction) {
		case "top-left":
			return {
				borderTop: "1px solid black",
				borderLeft: "1px solid black",
			};
		case "top-right":
			return {
				borderTop: "1px solid black",
				borderRight: "1px solid black",
			};
		case "bottom-left":
			return {
				borderBottom: "1px solid black",
				borderLeft: "1px solid black",
			};
		case "bottom-right":
			return {
				borderBottom: "1px solid black",
				borderRight: "1px solid black",
			};
		default:
			return {
				border: "none",
			};
	}
};
