import axios, { AxiosInstance } from 'axios';

export class Api {
    static instance: Api = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new Api();
        }

        return this.instance;
    }

    axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.BACKEND_URL,
        });
    }
}