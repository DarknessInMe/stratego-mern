import { AxiosInstance } from 'axios';
import { BaseRoute } from './BaseRoute';
import { IRoomCreate, IRoomJoin, IRoomUpdatePlayer } from './interfaces';

export class RoomRoute extends BaseRoute {
    constructor(axios: AxiosInstance) {
        super(axios, '/room');
    }

    async create(body: IRoomCreate) {
        return await this.axios.post(this.getEndpoint('create'), body);
    }

    async join(body: IRoomJoin) {
        return await this.axios.post(this.getEndpoint('join'), body);
    }

    async updatePlayer(body: IRoomUpdatePlayer) {
        return await this.axios.put(this.getEndpoint('player'), body);
    }
}