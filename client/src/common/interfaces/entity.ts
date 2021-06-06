import { Entities } from "../enums/entities";

export interface IEntity<T extends Entities> {
	type: T;
}
