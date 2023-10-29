import { IUser } from "./interfaces";

export type UserPayloadType = Omit<IUser, 'id'>