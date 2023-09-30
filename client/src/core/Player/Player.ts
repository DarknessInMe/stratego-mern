import { TeamsEnum } from 'shared/enums';
import { IPlayer } from 'shared/interfaces';

export class Player implements IPlayer {
    team: TeamsEnum;

    constructor(team: TeamsEnum) {
        this.team = team;
    }
}