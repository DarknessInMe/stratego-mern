import { Cards } from "../enums/cards";
import { Entities } from "../enums/entities";
import { IEntity } from "./entity";

export interface ICard extends IEntity<Entities.CARD> {
	name: Cards;
	value: number;
}
