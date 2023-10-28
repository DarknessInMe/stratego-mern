import { AxiosInstance } from 'axios';
import { BaseRoute } from './BaseRoute';
import { IRoomCreate, IRoomJoin, IRoomUpdatePlayer, ISession, IUserEntity } from '@stratego/common';

interface IJoinRoomResponse {
    session: ISession;
    user: IUserEntity;
}

export class RoomRoute extends BaseRoute {
    constructor(axios: AxiosInstance) {
        super(axios, '/room');
    }

    async create(body: IRoomCreate) {
        return await this.axios.post<ISession>(this.getEndpoint('create'), body);
    }

    async join(body: IRoomJoin) {
        return await this.axios.post<IJoinRoomResponse>(this.getEndpoint('join'), body);
    }

    async updatePlayer(body: IRoomUpdatePlayer) {
        return await this.axios.put(this.getEndpoint('player'), body);
    }
}