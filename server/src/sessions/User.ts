import { IUserEntity, TeamsEnum, IBaseUser } from '../common';

export class User implements IUserEntity {
    readonly id: string;
    team: TeamsEnum;
    isReady: boolean = false;

    constructor(id: string, team: TeamsEnum = TeamsEnum.RED_TEAM) {
        this.id = id;
        this.team = team;
    }

    update(payload: IBaseUser) {
        this.team = payload.team;
        this.isReady = payload.isReady;
    }
}