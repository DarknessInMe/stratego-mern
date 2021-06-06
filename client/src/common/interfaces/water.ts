import { Entities } from "../enums/entities";
import { Borders } from "../types/borders";
import { IEntity } from "./entity";

export interface IWater extends IEntity<Entities.WATER> {
	borderDirection: Borders;
}
