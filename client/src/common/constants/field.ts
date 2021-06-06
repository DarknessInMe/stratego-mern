import { Entities } from "../enums/entities";
import { ICard } from "../interfaces/card";
import { IWater } from "../interfaces/water";

export const field: (null | IWater | ICard)[][] = [
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[
		null,
		null,
		{
			type: Entities.WATER,
			borderDirection: "top-left",
		},
		{
			type: Entities.WATER,
			borderDirection: "top-right",
		},
		null,
		null,
		{
			type: Entities.WATER,
			borderDirection: "top-left",
		},
		{
			type: Entities.WATER,
			borderDirection: "top-right",
		},
		null,
		null,
	],
	[
		null,
		null,
		{
			type: Entities.WATER,
			borderDirection: "bottom-left",
		},
		{
			type: Entities.WATER,
			borderDirection: "bottom-right",
		},
		null,
		null,
		{
			type: Entities.WATER,
			borderDirection: "bottom-left",
		},
		{
			type: Entities.WATER,
			borderDirection: "bottom-right",
		},
		null,
		null,
	],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
];
