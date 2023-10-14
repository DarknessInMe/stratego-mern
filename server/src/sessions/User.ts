import { TeamsEnum } from '../shared/enums';
import { UpdatableUserType } from '../shared/types';

export class User {
    readonly id: string;
    team: TeamsEnum;
    isReady: boolean = false;

    constructor(id: string, team: TeamsEnum = TeamsEnum.RED_TEAM) {
        this.id = id;
        this.team = team;
    }

    update(payload: UpdatableUserType) {
        this.team = payload.team;
        this.isReady = payload.isReady;
    }
}