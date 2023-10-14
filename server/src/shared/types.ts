import { User } from '../sessions/User';

export type UpdatableUserType = Pick<User, 'team' | 'isReady'>;