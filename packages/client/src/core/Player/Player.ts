import { TeamsEnum } from '@stratego/common';
import { IPlayer } from 'shared/interfaces';

export class Player implements IPlayer {
    team: TeamsEnum;
    allowedRange: [number, number];

    constructor(team: TeamsEnum) {
        this.team = team;
        this.allowedRange = team === TeamsEnum.RED_TEAM ? [6, 9] : [0, 3];
    }
}