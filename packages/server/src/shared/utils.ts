import { TeamsEnum, IUser } from '@stratego/common';

export const createUser = (userId: string, team: TeamsEnum = TeamsEnum.RED_TEAM): IUser => ({
    id: userId,
    isReady: false,
    team,
});