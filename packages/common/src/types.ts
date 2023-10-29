import { IUser } from "./interfaces";

export type UserPayloadType = Partial<Omit<IUser, 'id'>>