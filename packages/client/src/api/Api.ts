import axios, { AxiosInstance } from 'axios';
import { RoomRoute } from './RoomRoute';

export class Api {
    static instance: Api = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new Api();
        }

        return this.instance;
    }

    axios: AxiosInstance;
    room: RoomRoute;

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.BACKEND_URL,
        });

        this.room = new RoomRoute(this.axios);
    }
}