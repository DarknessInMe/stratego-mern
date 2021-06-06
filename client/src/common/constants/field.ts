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
		},
		{
			type: Entities.WATER,
		},
		null,
		null,
		{
			type: Entities.WATER,
		},
		{
			type: Entities.WATER,
		},
		null,
		null,
	],
	[
		null,
		null,
		{
			type: Entities.WATER,
		},
		{
			type: Entities.WATER,
		},
		null,
		null,
		{
			type: Entities.WATER,
		},
		{
			type: Entities.WATER,
		},
		null,
		null,
	],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
];
